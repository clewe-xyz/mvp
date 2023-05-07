from app import schemas, models
from app.crud.base import CRUDBase


class CRUDQuest(
    CRUDBase[
        models.Quest,
        schemas.quests.QuestCreate,
        schemas.quests.QuestUpdate,
    ]
):
    ...


quest = CRUDQuest(models.Quest)
