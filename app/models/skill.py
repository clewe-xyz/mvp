from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, ForeignKey, VARCHAR
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
    question_id: Mapped[int] = Column(ForeignKey('question.id', ondelete='CASCADE'))
    topic: str = Column(VARCHAR(255))
    tag: str = Column(VARCHAR(255))
    point: int = Column(Integer)
    question: Mapped["Question"] = relationship('Question', back_populates='skills')


class UserSkill(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = Column(ForeignKey('usertable.id', ondelete='CASCADE'))
    topic: str = Column(VARCHAR(255))
    tag: str = Column(VARCHAR(255))
    user: Mapped["UserTable"] = relationship('UserTable', back_populates='skills')
    point: int = Column(Integer, default='0')
