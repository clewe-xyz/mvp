from typing import Union, Optional, Any

from app.schemas.base import DBBaseModel, BaseModel
from app.constants.enums import QuestionType
from typing_extensions import Annotated
from pydantic import Field, root_validator, validator
from app.schemas.skills import QuestionSkillDetails, SkillDetailsResponse


class BaseAnswer(BaseModel):
    true_answers: Union[list[str], str]
    all_answers: Optional[list[str]] = None

    @root_validator
    def answers_to_lower(cls, values):
        if true_answers := values.get('true_answers'):
            if isinstance(true_answers, str):
                values['true_answers'] = true_answers.lower()
            else:
                values['true_answers'] = [answer.lower() for answer in true_answers]
        if all_answers := values.get('all_answers'):
            values['all_answers'] = [answer.lower() for answer in all_answers]
        return values


class AnswerMultipleOption(BaseAnswer):
    true_answers: list[str]
    all_answers: list[str]


class AnswerSingleOption(BaseAnswer):
    true_answers: str
    all_answers: list[str]


class AnswerOpenedText(BaseAnswer):
    true_answers: str
    all_answers: None = None


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
        print('\n\n\nTYPE', question_type)
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
    def get_all_answers(cls, value):
        if all_answers := value.get('all_answers'):
            return all_answers
        return None


class QuestionCreate(Question):
    ...


class CreateQuestion(Question):
    quest_id: int
    experience_reward: int


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
    experience_reward: int
    skills: list[SkillDetailsResponse]


class QuestionCheckAnswer(BaseModel):
    is_correct: bool


class Answer(BaseModel):
    answers: Union[list[str], str]

    @validator('answers')
    def answers_to_lower(cls, value):
        if isinstance(value, str):
            return value.lower()
        return [answer.lower() for answer in value]
