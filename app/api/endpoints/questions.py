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


@router.get(
    '/base-questions/',
    response_model=list[questions.QuestionDetails],
    status_code=http_status.HTTP_200_OK,
)
def get_all_questions(db: Session = Depends(deps.get_db)):
    return crud.base_question.get_query(db=db).all()


@router.post(
    '/',
    response_model=questions.QuestionDetails,
    status_code=http_status.HTTP_201_CREATED,
)
def create_question(
    quest_in: questions.Question,
    db: Session = Depends(deps.get_db),
):
    return crud.base_question.create(db=db, obj_in=quest_in)


@router.post(
    '/bulk-create/',
    response_model=list[questions.QuestionDetails],
    status_code=http_status.HTTP_201_CREATED,
)
def bulk_create_questions(
    list_question_in: list[questions.Question],
    db: Session = Depends(deps.get_db)
):
    # создавать в этом же месте связанные скилы (айди скила и поинт)
    questions_obj = [
        models.BaseQuestion(
            **obj.dict()
        ) for obj in list_question_in
    ]
    return crud.base_question.create_many_objects(db=db, multi_obj_in=questions_obj)


@router.get(
    '/{question_id}/',
    response_model=questions.QuestionDetails,
    status_code=http_status.HTTP_200_OK,
)
def get_single_question(question_id: int, db: Session = Depends(deps.get_db)):
    return crud.question.read(db=db, params={'id': question_id})


@router.post(
    '/{question_id}/',
    response_model=questions.QuestionCheckAnswer,
    status_code=http_status.HTTP_200_OK,
)
def check_question_answer(
    question_id: int,
    answer: questions.Answer,
    db: Session = Depends(deps.get_db)
):
    question = crud.question.read(db=db, params={'id': question_id})
    true_answer = question.answers['true_answers']
    true_answer = question.answers['true_answers'].split() if isinstance(true_answer, str) else true_answer
    check_answer = answer.answers.split() if isinstance(answer.answers, str) else answer.answers
    is_correct = set(true_answer) == set(check_answer)
    if is_correct:
        crud.question.update(db=db, db_obj=question, obj_in={'is_answered': True})
    return questions.QuestionCheckAnswer(is_correct=is_correct)


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
