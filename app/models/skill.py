from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, ForeignKey, VARCHAR, DECIMAL
from sqlalchemy.orm import Mapped, relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from app.models import UserTable, Question


class BaseSkill(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    topic: str = Column(VARCHAR(255))
    tag: str = Column(VARCHAR(255))


class Skill(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    question_id: Mapped[int] = Column(
        ForeignKey('question.id', ondelete='CASCADE')
    )
    topic: str = Column(VARCHAR(255))
    tag: str = Column(VARCHAR(255))
    point: int = Column(Integer)
    # users: Mapped[list['UserTable']] = relationship(
    #     secondary='usersskills', back_populates='skills'
    # )
    question: Mapped["Question"] = relationship(
        'Question',
        back_populates='skills'
    )
    # questions: Mapped[list['Question']] = relationship(
    #     secondary='questionsskills', back_populates='skills'
    # )
    # users_skills: Mapped[list['UsersSkills']] = relationship(
    #     back_populates='skill', cascade="all, delete",
    # )
    # questions_skills: Mapped[list['QuestionsSkills']] = relationship(
    #     back_populates='skill', cascade="all, delete",
    # )


class UserSkill(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = Column(
        ForeignKey('usertable.id', ondelete='CASCADE')
    )
    topic: str = Column(VARCHAR(255))
    tag: str = Column(VARCHAR(255))
    user: Mapped["UserTable"] = relationship('UserTable', back_populates='skills')
    point: int = Column(Integer, default='0')
