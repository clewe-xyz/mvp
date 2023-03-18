from fastapi import APIRouter

from app.api.endpoints import (
    example,

)
from app.core.config import settings


API_PREFIX = settings.API_PATH

api_router = APIRouter()
api_router.include_router(example.router, prefix='/example', tags=['Example'])
