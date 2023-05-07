from fastapi import APIRouter, Depends, status as http_status
from sqlalchemy.orm import Session

from app.api import deps
from app.schemas import questions, skills
from app import models
from app import crud


router = APIRouter()


@router.get(
    '/',
    response_model=list[questions.QuestionDetails],
    status_code=http_status.HTTP_200_OK,
)
def get_all_questions(db: Session = Depends(deps.get_db)):
    return crud.question.get_query(db=db).all()


@router.post(
    '/',
    response_model=questions.QuestionDetails,
    status_code=http_status.HTTP_201_CREATED,
)
def create_question(
    quest_in: questions.Question,
    db: Session = Depends(deps.get_db),
):
    return crud.question.create(db=db, obj_in=quest_in)


@router.get(
    '/{question_id}/',
    response_model=questions.QuestionDetails,
    status_code=http_status.HTTP_200_OK,
)
def get_single_question(question_id: int, db: Session = Depends(deps.get_db)):
    return crud.question.read(db=db, params={'id': question_id})


@router.delete(
    '/{question_id}/',
    status_code=http_status.HTTP_204_NO_CONTENT,
)
def delete_question(question_id: int, db: Session = Depends(deps.get_db)):
    crud.question.delete(db=db, entity_id=question_id)


@router.put(
    '/{question_id}/',
    response_model=questions.QuestionDetails,
    status_code=http_status.HTTP_200_OK,
)
def update_question(
    question_id: int,
    quest_in: questions.Question,
    db: Session = Depends(deps.get_db),
):
    question = crud.question.read(db=db, params={'id': question_id})
    updated_question = crud.question.update(
        db=db, db_obj=question, obj_in=quest_in
    )
    return updated_question
