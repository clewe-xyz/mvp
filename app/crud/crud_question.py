from app import schemas, models
from app.crud.base import CRUDBase


class CRUDQuestion(
    CRUDBase[
        models.Question,
        schemas.questions.QuestionCreate,
        schemas.questions.QuestionUpdate,
    ]
):
    ...


question = CRUDQuestion(models.Question)
