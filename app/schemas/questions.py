from typing import Union, Optional

from app.schemas.base import DBBaseModel, BaseModel
from app.constants.enums import QuestionType
from typing_extensions import Annotated
from pydantic import Field, root_validator
from app.schemas.skills import QuestionSkillDetails


class AnswerMultipleOption(BaseModel):
    true_answers: list[str]
    fake_answers: list[str]


class AnswerSingleOption(BaseModel):
    true_answers: str
    fake_answers: list[str]


class AnswerOpenedText(BaseModel):
    true_answers: str
    fake_answers: None = None


Answers = Annotated[
    Union[AnswerMultipleOption, AnswerSingleOption, AnswerOpenedText],
    Field(description='type'),
]


class Question(DBBaseModel):
    question: str
    type: QuestionType
    answers: Answers

    @root_validator
    def check(cls, values):
        print('\n\n\n', values)
        question_type = values['type']
        if question_type == QuestionType.OpenedText:
            values['answers'] = AnswerOpenedText(**values['answers'].dict())
        if question_type == QuestionType.SingleOption:
            values['answers'] = AnswerSingleOption(**values['answers'].dict())
        if question_type == QuestionType.MultipleOptions:
            values['answers'] = AnswerMultipleOption(**values['answers'].dict())
        return values


class QuestionCreate(Question):
    ...


class QuestionUpdate(QuestionCreate):
    id: int


class QuestionDetails(Question):
    id: int


class SetSkillToQuestionRequest(BaseModel):
    skill_id: int
    point: int


class QuestionWithSkillsDetails(QuestionDetails):
    questions_skills: list[Optional[QuestionSkillDetails]] = Field(
        alias='skills_reward'
    )
