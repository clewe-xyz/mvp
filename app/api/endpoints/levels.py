from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session

from app.api import deps
from app.schemas import levels
from app import crud, models


router = APIRouter()


@router.get(
    '/',
    response_model=list[levels.LevelDetails],
    status_code=http_status.HTTP_200_OK,
)
def get_all_skills(db: Session = Depends(deps.get_db)):
    return crud.level.get_query(db=db).all()


@router.post(
    '/',
    response_model=levels.LevelDetails,
    status_code=http_status.HTTP_201_CREATED,
)
def create_level(
    level_in: levels.Level,
    db: Session = Depends(deps.get_db)
):
    return crud.level.create(db=db, obj_in=level_in)


@router.post(
    '/bulk-create/',
    response_model=list[levels.LevelDetails],
    status_code=http_status.HTTP_201_CREATED,
)
def bulk_create_levels(
    list_level_in: list[levels.Level],
    db: Session = Depends(deps.get_db),
):
    level_objs = [
        models.Level(**obj.dict()) for obj in list_level_in
    ]
    return crud.level.create_many_objects(db=db, multi_obj_in=level_objs)
