# Dance Coach Business Card Website

A production-ready full-stack web application for individual dance lessons (Bachata, Salsa, Kizomba) in Moscow.

## Tech Stack

- **Backend**: FastAPI (Python 3.11+), async SQLAlchemy 2.0, Celery + Redis
- **Database**: PostgreSQL
- **Frontend**: Next.js with SSR, React, Tailwind CSS
- **Infrastructure**: Docker, Docker Compose, Nginx

## Project Structure

```
.
├── backend/          # FastAPI backend
├── frontend/         # Next.js frontend
├── docker/           # Nginx configuration
├── docker-compose.yml
└── README.md
```

## Quick Start

1. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```

2. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access:
   - Frontend: http://localhost
   - Backend API: http://localhost/api
   - API Docs: http://localhost/api/docs

## Development

See individual README files in `backend/` and `frontend/` directories for detailed setup instructions.

## Environment Variables

See `.env.example` files in each directory for required environment variables.

