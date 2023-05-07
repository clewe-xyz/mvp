from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, ForeignKey, VARCHAR, DECIMAL
from sqlalchemy.orm import Mapped, relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from app.models import UserTable, UsersSkills, QuestionsSkills, Question


class Skill(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    topic: str = Column(VARCHAR(255))
    tag: str = Column(VARCHAR(255))
    users: Mapped[list['UserTable']] = relationship(
        secondary='usersskills', back_populates='skills'
    )
    questions: Mapped[list['Question']] = relationship(
        secondary='questionsskills', back_populates='skills'
    )
    users_skills: Mapped[list['UsersSkills']] = relationship(
        back_populates='skill'
    )
    questions_skills: Mapped[list['QuestionsSkills']] = relationship(
        back_populates='skill'
    )
