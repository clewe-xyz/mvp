from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import IncorrectAuthRequest
from app.models import UserTable, UsersSkills
from app.schemas import users, auth_schema, skills
from app import crud
from app import utils


router = APIRouter()


@router.get(
    '/', response_model=list[users.User], status_code=http_status.HTTP_200_OK
)
def get_all_users(
    db: Session = Depends(deps.get_db),
    user: users.User = Depends(deps.get_current_user),
):
    return crud.user.get_query(db=db).all()


@router.get(
    '/{user_id}/',
    response_model=users.User,
    status_code=http_status.HTTP_200_OK,
)
def get_single_user(
    user_id: int,
    db: Session = Depends(deps.get_db),
    user: users.User = Depends(deps.get_current_user),
):
    return crud.user.read(db=db, params={'id': user_id})


@router.post(
    '/signup/',
    summary='Create a new user',
    response_model=auth_schema.JWTTokenResponse,
)
async def create_user(
    data: users.UserSignup, db: Session = Depends(deps.get_db)
) -> auth_schema.JWTTokenResponse:
    quest = crud.quest.read(db=db, params={'id': data.completed_quest_id})
    user = UserTable(
        nickname=data.nickname,
        wallet_address=data.wallet_address,
        level=data.level,
        level_total_exp=data.level_total_exp,
        exp_to_next_level=data.exp_to_next_level,
        email=data.email,
        password=data.password,
    )
    user.completed_quests.append(quest)
    db.add(user)
    db.flush()
    db.commit()
    db.refresh(user)
    users_skills = [
        UsersSkills(
            user_id=user.id, skill_id=obj_in.skill_id, point=obj_in.point
        )
        for obj_in in data.users_skills
    ]
    db.bulk_save_objects(objects=users_skills, return_defaults=True)
    db.commit()
    jwt_token = auth_schema.JWTTokenResponse(
        access_token=utils.create_access_token(user.email),
        refresh_token=utils.create_refresh_token(user.email),
    )
    return jwt_token


@router.post('/login/', response_model=auth_schema.JWTTokenResponse)
async def login(
    request_data: users.UserAuth, db: Session = Depends(deps.get_db)
) -> auth_schema.JWTTokenResponse:
    user = (
        db.query(UserTable)
        .filter(UserTable.email == request_data.email)
        .first()
    )
    if not user:
        raise IncorrectAuthRequest()

    if not utils.verify_password(request_data.password, user.password):
        raise IncorrectAuthRequest()

    jwt_token = auth_schema.JWTTokenResponse(
        access_token=utils.create_access_token(user.email),
        refresh_token=utils.create_refresh_token(user.email),
    )
    return jwt_token


@router.get(
    '/get/me/',
    response_model=users.UserResponse,
    status_code=http_status.HTTP_200_OK,
)
async def get_me(user: users.User = Depends(deps.get_current_user)):
    return users.UserResponse.from_orm(user)


@router.get(
    '/get/access-token/',
    response_model=auth_schema.JWTTokenResponse,
    status_code=http_status.HTTP_200_OK,
)
async def get_new_access_token(
    jwt_token: auth_schema.JWTTokenResponse = Depends(
        deps.get_new_access_token
    ),
):
    return jwt_token


@router.get(
    '/my/skills/',
    response_model=list[skills.QuestionSkillDetails],
    status_code=http_status.HTTP_200_OK,
)
def get_my_skills(
    user: UserTable = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
):
    return user.users_skills
