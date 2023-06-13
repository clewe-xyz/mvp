from typing import Any, Generic, Type, TypeVar, Union, Optional

from pydantic import BaseModel
from sqlalchemy import asc, desc
from sqlalchemy.dialects.postgresql import Insert
from sqlalchemy.orm import Session, Query
from sqlalchemy.exc import IntegrityError
from psycopg2 import errors

from app.crud.exceptions import NotFound, AlreadyExists
from app.db.base_class import Base

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).

        **Parameters**

        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    def get_query(self, db: Session) -> Query:
        return db.query(self.model)

    def count(self, db: Session) -> int:
        return db.query(self.model).count()

    def get(self, db: Session, id: int) -> ModelType:
        obj = db.query(self.model).filter(self.model.id == id).first()
        if not obj:
            raise NotFound()
        return obj

    def read(self, db: Session, params: dict, options: list = None) -> ModelType:
        query = db.query(self.model).filter_by(**params)
        if options:
            query = query.options(*options)

        obj = query.first()
        if not obj:
            raise NotFound()
        return obj

    @staticmethod
    def order_by(query: Query, sort_by: str, sort_order: str = 'desc'):
        return query.order_by(
            asc(sort_by) if sort_order.strip().lower() == 'asc' else desc(sort_by)
        )

    def get_multi(
        self,
        db: Session,
        *,
        sort_by_column: str,
        sort_order: str = "ASC",
        skip: int = 0,
        limit: int = 100,
    ) -> list[ModelType]:
        return (
            db.query(self.model)
            .order_by(
                asc(sort_by_column) if sort_order == "ASC" else desc(sort_by_column)
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_multi_query(
        query: Query,
        *,
        sort_by_column: str,
        sort_order: str = "ASC",
        skip: int = 0,
        limit: int = 100,
    ) -> list[ModelType]:
        return (
            query.order_by(
                asc(sort_by_column) if sort_order == "ASC" else desc(sort_by_column)
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def return_multi_query(
        query: Query,
        *,
        sort_by_column: str,
        sort_order: str = "ASC",
        skip: int = 0,
        limit: int = 100,
    ) -> Query:
        return (
            query.order_by(
                asc(sort_by_column) if sort_order == "ASC" else desc(sort_by_column)
            )
            .offset(skip)
            .limit(limit)
        )

    def create(
        self,
        db: Session,
        *,
        obj_in: Union[CreateSchemaType, dict[str, Any]],
        commit=True,
    ) -> ModelType:
        db_obj = self.model(**self._parse_params(obj_in))  # type: ignore
        try:
            db.add(db_obj)
            db.flush()
            if commit:
                db.commit()
        except IntegrityError as e:
            if isinstance(e.orig, errors.UniqueViolation):
                raise AlreadyExists()
            raise

        if commit:
            db.refresh(db_obj)
        return db_obj

    def create_many_objects(
        self, db: Session, multi_obj_in: list[ModelType]
    ) -> list[ModelType]:
        db.bulk_save_objects(objects=multi_obj_in, return_defaults=True)
        db.commit()
        return multi_obj_in

    def create_many_values(
        self, db: Session, multi_obj_in: list[dict[str, Any]]
    ) -> None:
        statement = Insert(self.model).values(multi_obj_in)
        statement = statement.on_conflict_do_nothing()
        db.execute(statement=statement)
        db.commit()

    def create_many_schema(
        self, db: Session, multi_obj_in: list[CreateSchemaType], commit=True
    ) -> list[ModelType]:
        objects = [self.model(**self._parse_params(obj_in)) for obj_in in multi_obj_in]
        db.bulk_save_objects(objects=objects, return_defaults=True)
        if commit:
            db.commit()
        return objects

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, dict[str, Any]],
        obj_in_dict: Optional[dict[str, bool]] = None,
        commit=True,
    ) -> ModelType:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            if not isinstance(obj_in_dict, dict):
                obj_in_dict = {'exclude_unset': True, 'exclude_none': True}
            update_data = obj_in.dict(**obj_in_dict)

        for field, value in update_data.items():
            setattr(db_obj, field, value)

        try:
            db.add(db_obj)
            db.flush()
            if commit:
                db.commit()
        except IntegrityError as e:
            if isinstance(e.orig, errors.UniqueViolation):
                raise AlreadyExists()
            raise

        if commit:
            db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, *, entity_id: int, commit: bool = True) -> None:
        obj = self.get(db=db, id=entity_id)
        db.delete(obj)
        db.flush()
        if commit:
            db.commit()

    def bulk_delete(
        self, db: Session, *, entity_ids: list[int], commit: bool = True
    ) -> None:
        db.query(self.model).filter(self.model.id.in_(entity_ids)).delete()
        if commit:
            db.commit()

    def bulk_update(
        self,
        db: Session,
        *,
        db_obj_type: Type[ModelType],
        db_objs: list[ModelType],
        obj_in: list[Union[UpdateSchemaType, dict[str, Any]]],
        commit: bool = True,
        exclude_unset_fields: bool = False,
        exclude_none_fields: bool = True,
    ):
        update_data = []
        for obj_in_item in obj_in:
            if isinstance(obj_in_item, dict):
                update_data.append(obj_in_item)
            else:
                exclusions = {
                    'exclude_unset': exclude_unset_fields,
                    'exclude_none': exclude_none_fields,
                }
                update_data.append(obj_in_item.dict(**exclusions))

        try:
            db.bulk_update_mappings(db_obj_type, mappings=update_data)
            db.flush()
            if commit:
                db.commit()
        except IntegrityError as e:
            if isinstance(e.orig, errors.UniqueViolation):
                raise AlreadyExists()
            raise
        if commit:
            for db_obj in db_objs:
                db.refresh(db_obj)
        return db_objs

    @staticmethod
    def _parse_params(
        params: Union[BaseModel, dict[str, Any]],
        exclude_unset: bool = True,
        exclude_none: bool = True,
    ) -> dict[str, Any]:
        """Converts input parameters to dict

        Raises:
            ValueError: if parameters' type is incorrect.
        """

        if isinstance(params, dict):
            return params
        if isinstance(params, BaseModel):
            return params.dict(exclude_unset=exclude_unset, exclude_none=exclude_none)
        raise ValueError("Incorrect request parameters")
