from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, VARCHAR, Text, Float
from sqlalchemy.orm import relationship, Mapped

from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models import UserTable, UsersQuests, Question


class Quest(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(VARCHAR(255))
    description: str = Column(Text)
    tag: str = Column(VARCHAR(255))
    users: Mapped[list['UserTable']] = relationship(
        'UserTable',
        secondary="usersquests", back_populates='completed_quests'
    )
    # questions: Mapped[list['Question']] = relationship(
    #     secondary='questsquestions', back_populates='quests'
    # )
    users_quests: Mapped[list['UsersQuests']] = relationship(
        'UsersQuests',
        back_populates='quest', cascade="all, delete",
    )
    questions: Mapped[list['Question']] = relationship(
        'Question',
        back_populates='quest', cascade="all, delete",
    )
