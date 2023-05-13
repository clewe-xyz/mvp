from app.schemas.base import DBBaseModel


class Skill(DBBaseModel):
    tag: str
    topic: str


class SkillCreate(Skill):
    ...


class SkillUpdate(SkillCreate):
    id: int


class SkillDetails(Skill):
    id: int


class QuestionSkillDetails(DBBaseModel):
    skill: SkillDetails
    point: int
