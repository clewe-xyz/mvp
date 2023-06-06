import random

from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from faker import Faker

from app.api import deps
from app import models
from app.db.base_class import Base
from app.db.session import engine


router = APIRouter()

fake = Faker()

QUEST_NAMES = ['Blockchain', 'Dex', 'Crypto Wallet']


class Msg(BaseModel):
    msg: str


@router.get("/", response_model=Msg)
def test() -> Msg:
    """
    API Test
    """
    return Msg(msg='Hello world!')


@router.delete('/clear-db', status_code=http_status.HTTP_204_NO_CONTENT)
def clear_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("All tables are cleared")
    return Msg(msg='All tables have been cleared!')
