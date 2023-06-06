from typing import Optional

from pydantic import validator, Field, root_validator, EmailStr

from app.schemas.base import DBBaseModel, BaseModel
from app.schemas.skills import Skill
from app.schemas.achievements import Achievement
from app.schemas.quests import Quest, QuestDetails
from app import utils


class User(DBBaseModel):
    nickname: str
    wallet_address: Optional[str] = None
    level_id: Optional[int]
    level_accumulated_exp: Optional[int]


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


class UserRegister(DBBaseModel):
    id: Optional[int]
    nickname: str
    email: EmailStr
    password: str = Field(min_length=9)

    @validator('password')
    def get_hashed_password(cls, value):
        return utils.get_hashed_password(value)


class UserRegisterCreate(UserRegister):
    is_active: bool = True
    level_id: int = 1
    level_accumulated_exp: int = 0


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
    completed_quests: list[Optional[QuestDetails]]


class SkillRequest(BaseModel):
    skill_id: int


class UserCompleteQuestIn(DBBaseModel):
    experience_reward: int
    skills: list[SkillRequest]


class UserNotActiveResponse(DBBaseModel):
    id: int


class UserNotActiveRequest(DBBaseModel):
    nickname: str


class UserNotActiveCreate(UserNotActiveRequest):
    is_active: bool = False
    level_id: int = 1
    level_accumulated_exp: int = 0

