# from typing import TYPE_CHECKING, Optional
#
# from sqlalchemy import Column, Integer, ForeignKey, VARCHAR, Text
# from sqlalchemy.orm import Mapped, relationship
#
# from app.db.base_class import Base
#
#
# if TYPE_CHECKING:
#     from app.models import UserTable, UsersAchievements
#
#
# class Achievement(Base):
#     id: int = Column(Integer, primary_key=True, index=True)
#     name: str = Column(VARCHAR(255))
#     tag: str = Column(VARCHAR(255))
#     description: str = Column(Text)
#     experience_reward: int = Column(Integer)
#
#     users: Mapped[list["UserTable"]] = relationship(
#         secondary='usersachievements',
#         back_populates='achievements',
#     )
#     users_achievements: Mapped[list['UsersAchievements']] = relationship(
#         back_populates='achievement'
#     )
