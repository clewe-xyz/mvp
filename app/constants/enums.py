__all__ = ('QuestionType',)

from .base import BaseConstant


class QuestionType(BaseConstant):
    MultipleOptions = 1  # исправить на текст
    SingleOption = 2
    OpenedText = 3
