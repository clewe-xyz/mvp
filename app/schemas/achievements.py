from typing import Optional

from app.schemas.base import DBBaseModel, BaseModel


class Achievement(DBBaseModel):
    name: str
    tag: str
    description: str
    experience_reward: int


class AchievementCreate(Achievement):
    ...


class AchievementUpdate(Achievement):
    id: int


class AchievementDetails(Achievement):
    id: int
