import json
from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, VARCHAR, Text, Enum, JSON
from sqlalchemy.orm import Mapped, relationship

from app.db.base_class import Base
from app.constants.enums import QuestionType

if TYPE_CHECKING:
    from app.models import Quest, QuestsQuestions, Skill, QuestionsSkills


class Question(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    question: str = Column(Text, nullable=False)
    type: QuestionType = Column(Enum(QuestionType), nullable=False)
    answers: json = Column(JSON)
    experience_reward: int = Column(Integer)
    skills: Mapped[list["Skill"]] = relationship(
        secondary='questionsskills', back_populates='questions'
    )
    quests: Mapped[list["Quest"]] = relationship(
        secondary='questsquestions',
        back_populates='questions',
    )
    quests_questions: Mapped[list['QuestsQuestions']] = relationship(
        back_populates='question'
    )
    questions_skills: Mapped[list["QuestionsSkills"]] = relationship(
        back_populates='question'
    )
