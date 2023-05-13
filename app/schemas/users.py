from typing import Optional

from pydantic import validator, Field, root_validator, EmailStr

from app.schemas.base import DBBaseModel, BaseModel
from app.schemas.skills import Skill
from app.schemas.achievements import Achievement
from app.schemas.quests import Quest
from app import utils


class User(DBBaseModel):
    nickname: str
    wallet_address: Optional[str] = None
    level: Optional[int]
    level_total_exp: int
    exp_to_next_level: int = Field(alias='experience_reward')


class UserBase(User):
    skills: list[Optional[Skill]]
    trophies: list[Optional[Achievement]]
    completed_quests: list[Optional[Quest]]


class UserAuth(BaseModel):
    email: str
    password: str


class UserSkills(DBBaseModel):
    skill_id: int
    point: int


class UserCreate(User):
    email: EmailStr
    password: str = Field(min_length=9)

    @validator('password')
    def get_hashed_password(cls, value):
        return utils.get_hashed_password(value)


class UserSignup(UserCreate):
    completed_quest_id: int
    users_skills: list[Optional[UserSkills]]
    exp_to_next_level: int = Field(alias='experience_reward')

    @root_validator()
    def calculate_exp_reward(cls, values):
        if skills := values.get('users_skills'):
            exp_reward = 0
            for skill in skills:
                exp_reward += skill.point
            values['exp_to_next_level'] = exp_reward
        return values


class UserUpdate(UserCreate):
    id: int


class UserResponse(User):
    id: int
    level_total_exp: Optional[int]
    exp_to_next_level: Optional[int]
    skills: list[Optional[Skill]]
    completed_quests: list[Optional[Quest]]


class UserCompleteQuestIn(DBBaseModel):
    exp_to_next_level: int = Field(alias='experience_reward')
    skills_reward: list[UserSkills]
