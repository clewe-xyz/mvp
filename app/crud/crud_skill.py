from app import schemas, models
from app.crud.base import CRUDBase


class CRUDSkill(
    CRUDBase[
        models.Skill,
        schemas.skills.SkillCreate,
        schemas.skills.SkillUpdate,
    ]
):
    ...


skill = CRUDSkill(models.Skill)
