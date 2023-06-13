from typing import Union, Optional, Any

from app.schemas.base import DBBaseModel, BaseModel
from app.constants.enums import QuestionType
from typing_extensions import Annotated
from pydantic import Field, root_validator, validator
from app.schemas.skills import QuestionSkillDetails, SkillDetailsResponse


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
    answers: Union[AnswerMultipleOption, AnswerSingleOption, AnswerOpenedText]

    @root_validator
    def check(cls, values):
        question_type = values['type']
        if question_type == QuestionType.OpenedText:
            values['answers'] = AnswerOpenedText(**values['answers'].dict())
        if question_type == QuestionType.SingleOption:
            values['answers'] = AnswerSingleOption(**values['answers'].dict())
        if question_type == QuestionType.MultipleOptions:
            values['answers'] = AnswerMultipleOption(**values['answers'].dict())
        return values


class QuestionWithFakeAnswers(DBBaseModel):
    question: str
    type: QuestionType
    answers: dict[str, Any]

    @validator('answers')
    def get_fake_answers(cls, value):
        if fake_answers := value.get('fake_answers'):
            return fake_answers
        return None


class QuestionCreate(Question):
    ...


class CreateQuestion(Question):
    quest_id: int


class QuestionUpdate(QuestionCreate):
    id: int


class QuestionDetails(Question):
    id: int


class QuestionWithFakeAnswersDetails(QuestionWithFakeAnswers):
    id: int


class SetSkillToQuestionRequest(BaseModel):
    skill_id: int
    point: int


class QuestionWithSkillsDetails(QuestionDetails):
    questions_skills: list[Optional[QuestionSkillDetails]] = Field(
        alias='skills_reward'
    )


class QuestionWithFakeAnswersAndSkillsDetails(QuestionWithFakeAnswersDetails):
    questions_skills: list[Optional[QuestionSkillDetails]] = Field(
        alias='skills_reward'
    )


class QuestionDetailsResponse(QuestionWithFakeAnswers):
    id: int
    skills: list[SkillDetailsResponse]


class QuestionCheckAnswer(BaseModel):
    is_correct: bool


class Answer(BaseModel):
    answers: Union[list[str], str]
