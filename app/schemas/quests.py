from typing import Optional

from app.schemas.base import DBBaseModel, BaseModel
from app.schemas.questions import (
    QuestionWithSkillsDetails,
    QuestionWithFakeAnswersAndSkillsDetails,
    QuestionDetailsResponse,
)
from app.schemas.skills import SkillRequest


class Quest(DBBaseModel):
    name: str
    description: str
    tag: str


class QuestCreate(Quest):
    ...


class QuestionWithSkills(BaseModel):
    base_question_id: int
    experience_reward: int
    skills_list: list[SkillRequest]


class QuestCreateRequest(QuestCreate):
    questions_with_skills: list[QuestionWithSkills]


class QuestUpdate(QuestCreate):
    id: int


class QuestRequest(DBBaseModel):
    user_id: int


class QuestDetails(Quest):
    id: int


class QuestDetailsResponse(QuestDetails):
    questions: list[QuestionDetailsResponse]


class SkillToQuestion(BaseModel):
    skill_id: int
    point: int


class SetQuestionToQuestRequest(BaseModel):
    question_id: int
    skills: list[SkillToQuestion]


class QuestWithQuestionDetails(QuestDetails):
    questions: list[Optional[QuestionWithSkillsDetails]]


class QuestWithQuestionWithFakeAnswersDetails(QuestDetails):
    questions: list[Optional[QuestionWithFakeAnswersAndSkillsDetails]]
