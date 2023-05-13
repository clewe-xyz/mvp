from typing import Optional

from app.schemas.base import DBBaseModel, BaseModel
from app.schemas.questions import QuestionWithSkillsDetails


class Quest(DBBaseModel):
    name: str
    description: str
    tag: str


class QuestCreate(Quest):
    ...


class QuestUpdate(QuestCreate):
    id: int


class QuestRequest(DBBaseModel):
    user_id: int


class QuestDetails(Quest):
    id: int


class SetQuestionToQuestRequest(BaseModel):
    question_id: int
    skill_id: int
    point: int


class QuestWithQuestionDetails(QuestDetails):
    questions: list[Optional[QuestionWithSkillsDetails]]
