from fastapi import status


class CRUDError(Exception):
    def __init__(self, status_code: int, message: str):
        super().__init__(message)
        self.status_code = status_code
        self.message = message


class NotFound(CRUDError):
    def __init__(self, message: str = "Not found"):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, message=message)

