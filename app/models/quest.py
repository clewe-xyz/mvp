from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, VARCHAR, Text
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship, Mapped

from app.db.base_class import Base
from app.schemas.skills import Skill

if TYPE_CHECKING:
    from app.models import UserTable, UsersQuests, Question


class Quest(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(VARCHAR(255))
    description: str = Column(Text)
    tag: str = Column(VARCHAR(255))
    users: Mapped[list['UserTable']] = relationship(
        'UserTable', secondary="usersquests", back_populates='completed_quests'
    )
    users_quests: Mapped[list['UsersQuests']] = relationship(
        'UsersQuests',
        back_populates='quest',
        cascade="all, delete",
    )
    questions: Mapped[list['Question']] = relationship(
        'Question',
        back_populates='quest',
        cascade="all, delete",
    )

    @hybrid_property
    def skills(self) -> list[Skill]:
        skills_tag_set = set()
        skills_list = []
        for question in self.questions:
            for skill in question.skills:
                skill_schema = Skill.from_orm(skill)
                if skill_schema.tag not in skills_tag_set:
                    skills_tag_set.add(skill_schema.tag)
                    skills_list.append(skill_schema)
        return skills_list
