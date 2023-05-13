from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session

from app.api import deps
from app import schemas
from app.crud import achievement


router = APIRouter()


@router.get(
    '/',
    response_model=list[schemas.achievements.AchievementDetails],
    status_code=http_status.HTTP_200_OK,
)
def get_all_achievements(db: Session = Depends(deps.get_db)):
    return achievement.get_query(db=db).all()


@router.post(
    '/',
    response_model=schemas.achievements.AchievementDetails,
    status_code=http_status.HTTP_201_CREATED,
)
def create_achievement(
    achievement_in: schemas.achievements.AchievementCreate,
    db: Session = Depends(deps.get_db),
):
    achievement_obj = achievement.create(db=db, obj_in=achievement_in)
    return achievement_obj


@router.get(
    '/{achievement_id}/',
    response_model=schemas.achievements.AchievementDetails,
    status_code=http_status.HTTP_200_OK,
)
def get_achievement(achievement_id: int, db: Session = Depends(deps.get_db)):
    return achievement.read(db=db, params={'id': achievement_id})


@router.delete(
    '/{achievement_id}/',
    status_code=http_status.HTTP_204_NO_CONTENT,
)
def delete_achievement(achievement_id: int, db: Session = Depends(deps.get_db)):
    achievement.delete(db=db, entity_id=achievement_id)


@router.put(
    '/{achievement_id}/',
    response_model=schemas.achievements.AchievementDetails,
    status_code=http_status.HTTP_200_OK,
)
def update_achievement(
    achievement_id: int,
    achievement_in: schemas.achievements.Achievement,
    db: Session = Depends(deps.get_db),
):
    achievement_obj = achievement.read(db=db, params={'id': achievement_id})
    updated_achievement = achievement.update(
        db=db, db_obj=achievement_obj, obj_in=achievement_in
    )
    return updated_achievement
