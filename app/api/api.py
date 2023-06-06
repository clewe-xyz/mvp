from fastapi import APIRouter

from app.api.endpoints import (
    example,
    users,
    quests,
    # achievements,
    skills,
    questions,
    levels,
)
from app.core.config import settings


API_PREFIX = settings.API_PATH

api_router = APIRouter()
api_router.include_router(example.router, prefix='/example', tags=['Example'])
api_router.include_router(users.router, prefix='/users', tags=['Users'])
api_router.include_router(quests.router, prefix='/quests', tags=['Quest'])
api_router.include_router(skills.router, prefix='/skills', tags=['Skill'])
api_router.include_router(
    questions.router, prefix='/questions', tags=['Question']
)
# api_router.include_router(
#     achievements.router, prefix='/achievements', tags=['Achievements']
# )
api_router.include_router(
    levels.router, prefix='/levels', tags=['Level']
)
