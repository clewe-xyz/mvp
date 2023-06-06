from app import schemas, models
from app.crud.base import CRUDBase


class CRUDBaseQuestion(
    CRUDBase[
        models.BaseQuestion,
        schemas.questions.QuestionCreate,
        schemas.questions.QuestionUpdate,
    ]
):
    ...


base_question = CRUDBaseQuestion(models.BaseQuestion)
