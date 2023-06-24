from typing import Optional

from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from psycopg2 import errors


from app.api import deps
from app.schemas import quests, users, questions, skills
from app.crud.exceptions import AlreadyExists
from app import crud, models


router = APIRouter()


@router.get(
    '/',
    response_model=list[quests.QuestDetails],
    status_code=http_status.HTTP_200_OK,
)
def get_all_quests(db: Session = Depends(deps.get_db)):
    return crud.quest.get_query(db=db).all()


@router.post(
    '/',
    response_model=quests.QuestDetailsResponse,
    status_code=http_status.HTTP_201_CREATED,
)
def create_quest(
    quest_in: quests.QuestCreateRequest,
    db: Session = Depends(deps.get_db),
):
    # добавить эксп реворд к вопросам
    create_quest_schema = quests.Quest(**quest_in.dict())
    quest = crud.quest.create(db=db, obj_in=create_quest_schema, commit=False)
    for base_question in quest_in.questions_with_skills:
        base_question_obj = crud.base_question.read(
            db=db, params={'id': base_question.base_question_id}
        )
        question_schema = questions.CreateQuestion(
            quest_id=quest.id,
            question=base_question_obj.question,
            type=base_question_obj.type,
            answers=base_question_obj.answers,
            experience_reward=base_question.experience_reward,
        )
        question = crud.question.create(db=db, obj_in=question_schema, commit=False)
        for skill in base_question.skills_list:
            skill_obj = crud.base_skill.read(db=db, params={'id': skill.base_skill_id})
            skill_schema = skills.CreateSkill(
                question_id=question.id,
                tag=skill_obj.tag,
                topic=skill_obj.topic,
                point=skill.point,
            )
            crud.skill.create(db=db, obj_in=skill_schema, commit=False)
    db.commit()
    return quest


@router.post(
    '/bulk-create/',
    response_model=list[quests.QuestDetails],
    status_code=http_status.HTTP_201_CREATED,
)
def bulk_create_quests(
    list_quest_in: list[quests.Quest],
    db: Session = Depends(deps.get_db),
):
    quest_objs = [models.Quest(**obj.dict()) for obj in list_quest_in]
    return crud.quest.create_many_objects(db=db, multi_obj_in=quest_objs)


@router.get(
    '/me/{quest_id}/',
    response_model=quests.QuestDetailsResponse,
    status_code=http_status.HTTP_200_OK,
)
def get_single_quest(
    quest_id: int,
    db: Session = Depends(deps.get_db),
    user: models.UserTable = Depends(deps.get_current_user),
):
    return user.get_single_quest(quest_id)


@router.get(
    '/{quest_id}/',
    response_model=quests.QuestDetailsResponse,
    status_code=http_status.HTTP_200_OK,
)
def get_single_quest(
    quest_id: int,
    db: Session = Depends(deps.get_db),
):
    return crud.quest.read(db=db, params={'id': quest_id})


@router.get(
    '/my/list/quests/',
    response_model=list,
    status_code=http_status.HTTP_200_OK,
)
def get_my_quests(
    db: Session = Depends(deps.get_db),
    user: models.UserTable = Depends(deps.get_current_user),
):
    user_completed_quests_id = {quest.id for quest in user.completed_quests}
    quest_objs = db.query(models.Quest).all()
    quest_schemas = [
        quests.MyQuestDetailsResponse.from_orm(quest_obj) for quest_obj in quest_objs
    ]
    for schema in quest_schemas:
        schema.is_completed = schema.id in user_completed_quests_id
    return quest_schemas


@router.delete(
    '/{quest_id}/',
    status_code=http_status.HTTP_204_NO_CONTENT,
)
def delete_quest(quest_id: int, db: Session = Depends(deps.get_db)):
    crud.quest.delete(db=db, entity_id=quest_id)


@router.put(
    '/{quest_id}/',
    response_model=quests.QuestDetails,
    status_code=http_status.HTTP_200_OK,
)
def update_quest(
    quest_id: int,
    quest_in: quests.Quest,
    db: Session = Depends(deps.get_db),
):
    quest = crud.quest.read(db=db, params={'id': quest_id})
    updated_quest = crud.quest.update(db=db, db_obj=quest, obj_in=quest_in)
    return updated_quest


@router.post(
    '/complete/{quest_id}/',
    status_code=http_status.HTTP_200_OK,
)
def complete_quest(
    quest_id: int,
    complete_quest_in: users.UserCompleteQuestIn,
    user: models.UserTable = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
):
    quest = crud.quest.read(db=db, params={'id': quest_id})
    user.completed_quests.append(quest)

    if user.is_level_completed(complete_quest_in.experience_reward):
        level = (
            db.query(models.Level)
            .filter(models.Level.level_value == (user.level.level_value + 1))
            .first()
        )
        level_id = level.id
        exp_reward = user.new_exp_reward(complete_quest_in.experience_reward)
    else:
        exp_reward = user.level_accumulated_exp + complete_quest_in.experience_reward
        level_id = user.level.id
    crud.user.update(
        db=db,
        db_obj=user,
        obj_in={'level_id': level_id, 'level_accumulated_exp': exp_reward},
    )
    update_skill_obj = []
    update_skill_dict = {}
    crete_skill_dict = {}

    skills_objs = (
        db.query(models.Skill)
        .filter(
            models.Skill.id.in_([skill.skill_id for skill in complete_quest_in.skills])
        )
        .all()
    )

    for skill_obj in skills_objs:
        if skill_obj.tag in user.get_skill_map:
            if skill_obj.tag in update_skill_dict:
                update_skill_dict[skill_obj.tag] += skill_obj.point
            else:
                update_skill_dict[skill_obj.tag] = skill_obj.point
        else:
            if skill_obj.tag in crete_skill_dict:
                crete_skill_dict[skill_obj.tag]['point'] += skill_obj.point
            else:
                crete_skill_dict[skill_obj.tag] = {
                    'point': skill_obj.point,
                    'obj': skill_obj,
                }

    for skill_obj in skills_objs:
        if skill_obj.tag in user.get_skill_map:
            update_skill = user.get_skill_map.get(skill_obj.tag)
            update_skill_obj.append(
                {
                    'id': update_skill.id,
                    'point': update_skill.point + update_skill_dict.get(skill_obj.tag),
                }
            )

    if update_skill_obj:
        db.bulk_update_mappings(models.UserSkill, mappings=update_skill_obj)
    objects = [
        models.UserSkill(
            tag=obj_in['obj'].tag,
            topic=obj_in['obj'].topic,
            user_id=user.id,
            point=obj_in['point'],
        )
        for obj_in in crete_skill_dict.values()
    ]
    db.bulk_save_objects(objects=objects, return_defaults=True)
    db.commit()

    return {'response': 'quest has been completed'}
