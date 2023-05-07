from app import schemas, models
from app.crud.base import CRUDBase


class CRUDAchievement(
    CRUDBase[
        models.Achievement,
        schemas.achievements.AchievementCreate,
        schemas.achievements.AchievementUpdate,
    ]
):
    ...


achievement = CRUDAchievement(models.Achievement)
