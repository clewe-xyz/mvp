from app import schemas, models
from app.crud.base import CRUDBase


class CRUDBaseSkill(
    CRUDBase[
        models.BaseSkill,
        schemas.skills.SkillCreate,
        schemas.skills.SkillUpdate,
    ]
):
    ...


base_skill = CRUDBaseSkill(models.BaseSkill)
