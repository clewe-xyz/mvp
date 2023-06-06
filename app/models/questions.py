import json
from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, VARCHAR, Text, Enum, JSON, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, relationship

from app.db.base_class import Base
from app.constants.enums import QuestionType

if TYPE_CHECKING:
    from app.models import Quest, Skill


class BaseQuestion(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    question: str = Column(Text, nullable=False)
    type: QuestionType = Column(Enum(QuestionType), nullable=False)
    answers: json = Column(JSON)
    experience_reward: int = Column(Integer)


class Question(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    quest_id: Mapped[int] = Column(ForeignKey('quest.id', ondelete='CASCADE'))
    question: str = Column(Text, nullable=False)
    type: QuestionType = Column(Enum(QuestionType), nullable=False)
    answers: json = Column(JSON)
    # is_answered: bool = Column(Boolean, default=None) # когда верно ответил
    experience_reward: int = Column(Integer)  # динамически суммировать и получать тещий эксп юзера
    # skills: Mapped[list["Skill"]] = relationship(
    #     secondary='questionsskills', back_populates='questions'
    # )
    skills: Mapped[list["Skill"]] = relationship('Skill',
        back_populates='question', cascade="all, delete",
    )
    quest: Mapped["Quest"] = relationship('Quest', back_populates='questions')
    # quests: Mapped[list["Quest"]] = relationship(
    #     secondary='questsquestions',
    #     back_populates='questions',
    # )
    # quests_questions: Mapped[list['QuestsQuestions']] = relationship(
    #     back_populates='question', cascade="all, delete",
    # )
    # questions_skills: Mapped[list["QuestionsSkills"]] = relationship(
    #     back_populates='question', cascade="all, delete",
    # )
