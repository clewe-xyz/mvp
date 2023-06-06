from app.schemas.base import DBBaseModel


class Level(DBBaseModel):
    level_value: int
    total_exp: int


class LevelCreate(Level):
    ...


class LevelUpdate(LevelCreate):
    id: int


class LevelDetails(Level):
    id: int
