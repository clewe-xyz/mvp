__all__ = ('QuestionType',)

from .base import BaseConstant


class QuestionType(BaseConstant):
    MultipleOptions = 1
    SingleOption = 2
    OpenedText = 3
