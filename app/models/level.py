from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship, Mapped

from app.db.base_class import Base

if TYPE_CHECKING:
    from app.models import UserTable


class Level(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    level_value: int = Column(Integer, unique=True)
    total_exp: str = Column(Integer)  # сколько нужно набрать чтобы левелапнуться

    users: Mapped[list["UserTable"]] = relationship('UserTable', back_populates='level')
