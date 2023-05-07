from app import schemas, models
from app.crud.base import CRUDBase


class CRUDUser(
    CRUDBase[
        models.UserTable,
        schemas.users.UserCreate,
        schemas.users.UserUpdate,
    ]
):
    ...


user = CRUDUser(models.UserTable)
