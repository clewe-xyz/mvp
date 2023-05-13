from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import Mapped, relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from app.models import UserTable, Quest, Question, Skill, Achievement


class UsersQuests(Base):
    user_id: Mapped[int] = Column(ForeignKey('usertable.id'), primary_key=True)
    quest_id: Mapped[int] = Column(ForeignKey('quest.id'), primary_key=True)
    user: Mapped["UserTable"] = relationship(back_populates="users_quests")
    quest: Mapped["Quest"] = relationship(back_populates="users_quests")


class QuestsQuestions(Base):
    quest_id: Mapped[int] = Column(ForeignKey('quest.id'), primary_key=True)
    question_id: Mapped[int] = Column(
        ForeignKey('question.id'), primary_key=True
    )
    quest: Mapped["Quest"] = relationship(back_populates='quests_questions')
    question: Mapped["Question"] = relationship(
        back_populates='quests_questions'
    )


class UsersSkills(Base):
    user_id: Mapped[int] = Column(ForeignKey('usertable.id'), primary_key=True)
    skill_id: Mapped[int] = Column(ForeignKey('skill.id'), primary_key=True)
    user: Mapped["UserTable"] = relationship(back_populates='users_skills')
    skill: Mapped["Skill"] = relationship(back_populates='users_skills')
    point: int = Column(Integer)


class QuestionsSkills(Base):
    question_id: Mapped[int] = Column(
        ForeignKey('question.id'), primary_key=True
    )
    skill_id: Mapped[int] = Column(ForeignKey('skill.id'), primary_key=True)
    question: Mapped["Question"] = relationship(
        back_populates='questions_skills'
    )
    skill: Mapped["Skill"] = relationship(back_populates='questions_skills')
    point: int = Column(Integer)


class UsersAchievements(Base):
    user_id: Mapped[int] = Column(ForeignKey('usertable.id'), primary_key=True)
    achievement_id: Mapped[int] = Column(
        ForeignKey('achievement.id'), primary_key=True
    )
    user: Mapped["UserTable"] = relationship(
        back_populates='users_achievements'
    )
    achievement: Mapped["Achievement"] = relationship(
        back_populates='users_achievements'
    )
