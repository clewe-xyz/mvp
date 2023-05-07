from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session

from app.api import deps
from app.schemas import skills
from app import crud


router = APIRouter()


@router.get(
    '/',
    response_model=list[skills.SkillDetails],
    status_code=http_status.HTTP_200_OK,
)
def get_all_skills(db: Session = Depends(deps.get_db)):
    return crud.skill.get_query(db=db).all()


@router.post(
    '/',
    response_model=skills.SkillDetails,
    status_code=http_status.HTTP_201_CREATED,
)
def create_skill(
    skill_in: skills.Skill,
    db: Session = Depends(deps.get_db),
):
    return crud.skill.create(db=db, obj_in=skill_in)


@router.get(
    '/{skill_id}/',
    response_model=skills.SkillDetails,
    status_code=http_status.HTTP_200_OK,
)
def get_single_skill(skill_id: int, db: Session = Depends(deps.get_db)):
    return crud.skill.read(db=db, params={'id': skill_id})


@router.delete(
    '/{skill_id}/',
    status_code=http_status.HTTP_204_NO_CONTENT,
)
def delete_skill(skill_id: int, db: Session = Depends(deps.get_db)):
    crud.skill.delete(db=db, entity_id=skill_id)


@router.put(
    '/{skill_id}/',
    response_model=skills.SkillDetails,
    status_code=http_status.HTTP_200_OK,
)
def update_skill(
    skill_id: int,
    skill_in: skills.Skill,
    db: Session = Depends(deps.get_db),
):
    skill = crud.skill.read(db=db, params={'id': skill_id})
    updated_skill = crud.skill.update(db=db, db_obj=skill, obj_in=skill_in)
    return updated_skill


# @router.get(
#     ''
# )
