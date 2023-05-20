from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, VARCHAR, Text
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.ext.hybrid import hybrid_method


from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models import (
        Quest,
        Skill,
        Achievement,
        UsersAchievements,
        UsersQuests,
        UsersSkills,
    )


class UserTable(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    nickname: int = Column(VARCHAR(255))
    wallet_address: str = Column(VARCHAR(255))
    level: int = Column(Integer, default=0)
    level_total_exp: int = Column(Integer)
    exp_to_next_level: int = Column(Integer)
    email: str = Column(VARCHAR(128), unique=True, index=True)
    password: str = Column(Text)
    completed_quests: Mapped[list['Quest']] = relationship(
        secondary="usersquests", back_populates='users'
    )
    skills: Mapped[list['Skill']] = relationship(
        secondary='usersskills', back_populates='users'
    )
    achievements: Mapped[list['Achievement']] = relationship(
        secondary='usersachievements', back_populates='users'
    )
    users_quests: Mapped[list['UsersQuests']] = relationship(
        back_populates='user'
    )
    users_skills: Mapped[list['UsersSkills']] = relationship(
        back_populates='user'
    )
    users_achievements: Mapped[list['UsersAchievements']] = relationship(
        back_populates='user'
    )

    @hybrid_method
    def get_single_quest(self, quest_id):
        from app.crud import NotFound

        quest = next(
            (quest for quest in self.completed_quests if quest.id == quest_id),
            None,
        )
        if not quest:
            raise NotFound()
        return quest
