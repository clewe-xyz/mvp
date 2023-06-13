from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, VARCHAR, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.ext.hybrid import hybrid_method, hybrid_property


from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models import (
        Quest,
        UsersQuests,
        Level,
        UserSkill,
    )


class UserTable(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    nickname: str = Column(VARCHAR(255))
    wallet_address: str = Column(VARCHAR(255))
    level_id: Mapped[int] = Column(
        Integer, ForeignKey('level.id', ondelete='SET NULL'), index=True
    )
    level_accumulated_exp: int = Column(Integer)  # текущий эксп (обнулять )
    email: str = Column(VARCHAR(128), unique=True, index=True)
    password: str = Column(Text)
    is_active: bool = Column(Boolean, default=False)
    level: Mapped["Level"] = relationship('Level', back_populates='users')
    completed_quests: Mapped[list['Quest']] = relationship(
        'Quest', secondary="usersquests", back_populates='users'
    )
    users_quests: Mapped[list['UsersQuests']] = relationship(
        back_populates='user',
        cascade="all, delete",
    )
    skills: Mapped[list['UserSkill']] = relationship(
        'UserSkill',
        back_populates='user',
        cascade="all, delete",
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

    @hybrid_property
    def exp_to_next_level(self):
        return self.level.total_exp - self.level_accumulated_exp

    @hybrid_method
    def is_level_completed(self, exp_reward: int):
        return (self.level_accumulated_exp + exp_reward) >= self.level.total_exp

    @hybrid_method
    def new_exp_reward(self, exp_reward: int):
        return self.level_accumulated_exp + exp_reward - self.level.total_exp

    @hybrid_property
    def get_skill_map(self):
        return {skill.tag: skill for skill in self.skills}
