from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import IncorrectAuthRequest, AlreadyExists
from app.models import UserTable
from app.schemas import users, auth_schema, skills
from app import crud
from app import utils


router = APIRouter()


@router.get('/', response_model=list[users.User], status_code=http_status.HTTP_200_OK)
def get_all_users(
    db: Session = Depends(deps.get_db),
    user: users.User = Depends(deps.get_current_user),
):
    return crud.user.get_query(db=db).all()


@router.get(
    '/single/{user_id}/',
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
    '/create/not-active/',
    summary='Create not active user',
    response_model=users.UserNotActiveResponse,
)
def create_not_active_user(
    user_data: users.UserNotActiveRequest, db: Session = Depends(deps.get_db)
):
    user_create_schema = users.UserNotActiveCreate(nickname=user_data.nickname)
    return crud.user.create(db=db, obj_in=user_create_schema)


@router.post(
    '/register/',
    response_model=auth_schema.JWTTokenResponse,
)
def register_user(
    data: users.UserRegister,
    db: Session = Depends(deps.get_db),
):
    user_create_schema = users.UserRegisterCreate(**data.dict())
    if data.id:
        user = crud.user.read(db=db, params={'id': user_create_schema.id})
        if user.is_active:
            raise AlreadyExists()
        user = crud.user.update(db=db, db_obj=user, obj_in=user_create_schema.dict())
    else:
        user = crud.user.create(db=db, obj_in=user_create_schema.dict())
    jwt_token = auth_schema.JWTTokenResponse(
        access_token=utils.create_access_token(user.email),
        refresh_token=utils.create_refresh_token(user.email),
    )
    return jwt_token


@router.post('/login/', response_model=auth_schema.JWTTokenResponse)
async def login(
    request_data: users.UserAuth, db: Session = Depends(deps.get_db)
) -> auth_schema.JWTTokenResponse:
    user = db.query(UserTable).filter(UserTable.email == request_data.email).first()
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
    '/me/',
    response_model=users.UserResponse,
    status_code=http_status.HTTP_200_OK,
)
async def get_me(user: users.User = Depends(deps.get_current_user)):
    return users.UserResponse.from_orm(user)

@router.patch(
    '/me/',
    response_model=users.UserResponse,
    status_code=http_status.HTTP_200_OK,
)
def get_me(
    update_data: users.UserUpdateWalletAddress,
    user: users.User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    crud.user.update(db=db, db_obj=user, obj_in=update_data.dict())
    return users.UserResponse.from_orm(user)


@router.patch(
    '/me/nft/',
    response_model=users.UserResponse,
    status_code=http_status.HTTP_200_OK,
)
def get_me(
    update_data: users.UserUpdateNFT,
    user: users.User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    crud.user.update(db=db, db_obj=user, obj_in=update_data.dict())
    return users.UserResponse.from_orm(user)


@router.get(
    '/me/access-token/',
    response_model=auth_schema.JWTTokenResponse,
    status_code=http_status.HTTP_200_OK,
)
async def get_new_access_token(
    jwt_token: auth_schema.JWTTokenResponse = Depends(deps.get_new_access_token),
):
    return jwt_token


@router.get(
    '/me/skills/',
    response_model=list[skills.UserSkill],
    status_code=http_status.HTTP_200_OK,
)
def get_my_skills(
    user: UserTable = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
):
    return user.skills
