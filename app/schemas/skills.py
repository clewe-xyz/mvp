from app.schemas.base import DBBaseModel, BaseModel


class Skill(DBBaseModel):
    tag: str
    topic: str


class SkillCreate(Skill):
    ...


class UserSkillCreate(Skill):
    user_id: int


class CreateSkill(Skill):
    question_id: int
    point: int


class SkillUpdate(SkillCreate):
    id: int


class SkillDetails(Skill):
    id: int


class UserSkill(Skill):
    point: int


class QuestionSkillDetails(DBBaseModel):
    skill: SkillDetails
    point: int


class SkillRequest(BaseModel):
    base_skill_id: int
    point: int


class SkillDetailsResponse(SkillDetails):
    point: int
