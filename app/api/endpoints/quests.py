from typing import Optional

from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from psycopg2 import errors


from app.api import deps
from app.models import UsersSkills
from app.schemas import quests, users
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
    response_model=quests.QuestDetails,
    status_code=http_status.HTTP_201_CREATED,
)
def create_quest(
    quest_in: quests.Quest,
    db: Session = Depends(deps.get_db),
):
    return crud.quest.create(db=db, obj_in=quest_in)


@router.get(
    '/my/{quest_id}/',
    response_model=quests.QuestWithQuestionDetails,
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
    response_model=quests.QuestWithQuestionDetails,
    status_code=http_status.HTTP_200_OK,
)
def get_single_quest(
    quest_id: int,
    db: Session = Depends(deps.get_db),
):
    return crud.quest.read(db=db, params={'id': quest_id})


@router.get(
    '/my/quests/',
    response_model=list[quests.QuestWithQuestionDetails],
    status_code=http_status.HTTP_200_OK,
)
def get_my_quests(
    user: models.UserTable = Depends(deps.get_current_user),
):
    return user.completed_quests


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
    '/{quest_id}/',
    response_model=quests.QuestWithQuestionDetails,
    status_code=http_status.HTTP_201_CREATED,
)
def set_question_to_quest(
    quest_id: int,
    request_in: list[quests.SetQuestionToQuestRequest],
    db: Session = Depends(deps.get_db),
):
    quest = crud.quest.read(db=db, params={'id': quest_id})
    try:
        question_objs = [
            models.QuestsQuestions(
                quest_id=quest.id,
                question_id=obj_in.question_id,
            )
            for obj_in in request_in
        ]
        skills_objs = [
            models.QuestionsSkills(
                question_id=obj_in.question_id,
                skill_id=obj_in.skill_id,
                point=obj_in.point,
            )
            for obj_in in request_in
        ]
        db.bulk_save_objects(objects=question_objs, return_defaults=True)
        db.bulk_save_objects(objects=skills_objs, return_defaults=True)
        db.commit()
    except IntegrityError as e:
        if isinstance(e.orig, errors.UniqueViolation):
            raise AlreadyExists()
        raise

    quest_schema = quests.QuestWithQuestionDetails(
        id=quest.id,
        name=quest.name,
        description=quest.description,
        tag=quest.tag,
        questions=quest.questions,
    )
    return quest_schema


@router.post(
    '/complete/{quest_id}/',
    response_model=quests.QuestWithQuestionDetails,
    status_code=http_status.HTTP_201_CREATED,
)
def complete_quest(
    quest_id: int,
    complete_quest_in: users.UserCompleteQuestIn,
    user: models.UserTable = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
):
    quest = crud.quest.read(db=db, params={'id': quest_id})
    user.completed_quests.append(quest)
    users_skills = [
        UsersSkills(
            user_id=user.id, skill_id=obj_in.skill_id, point=obj_in.point
        )
        for obj_in in complete_quest_in.skills_reward
    ]
    exp_reward = user.exp_to_next_level + complete_quest_in.exp_to_next_level
    crud.user.update(
        db=db,
        db_obj=user,
        obj_in={'exp_to_next_level': exp_reward},
        commit=False,
    )
    db.bulk_save_objects(objects=users_skills, return_defaults=True)
    db.commit()
    return quest
