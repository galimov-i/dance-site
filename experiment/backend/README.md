# Dance Coach Backend

FastAPI backend for the dance coach business card website.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
   - Database URL
   - JWT secret key
   - Telegram bot token (optional)
   - Google Calendar credentials (optional)

5. Run database migrations:
```bash
alembic upgrade head
```

6. Run the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

## Running Tests

```bash
pytest
```

With coverage:
```bash
pytest --cov=app --cov-report=html
```

## Celery

Start Celery worker:
```bash
celery -A app.celery_app worker --loglevel=info
```

Start Celery beat (for scheduled tasks):
```bash
celery -A app.celery_app beat --loglevel=info
```

## Database Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "Description"
```

Apply migrations:
```bash
alembic upgrade head
```

