from app import schemas, models
from app.crud.base import CRUDBase


class CRUDLevel(
    CRUDBase[
        models.Level,
        schemas.levels.LevelCreate,
        schemas.levels.LevelUpdate,
    ]
):
    ...


level = CRUDLevel(models.Level)
