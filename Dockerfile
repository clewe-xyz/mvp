FROM python:3.9-alpine

ENV PROJECT_ROOT=/home/ubuntu/clewe
WORKDIR $PROJECT_ROOT

COPY requirements.txt /tmp/requirements.txt

ENV PYTHONPATH=/app
ENV PYTHONBUFFERED 1

RUN apk update && \
    apk add --no-cache --virtual .build-deps \
        build-base \
        libffi-dev \
        openssl-dev \
        && \
    pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r /tmp/requirements.txt && \
    apk del .build-deps

COPY ./app $PROJECT_ROOT/app
COPY alembic $PROJECT_ROOT/alembic
COPY .env $PROJECT_ROOT/.env

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
