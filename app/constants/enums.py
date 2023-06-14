__all__ = ('QuestionType',)

from .base import BaseConstant


class QuestionType(BaseConstant):
    MultipleOptions = 'Multiple-options'  # исправить на текст
    SingleOption = 'Single-option'
    OpenedText = 'Opened-text'
