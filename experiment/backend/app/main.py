from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, leads, slots, subscriptions, blog, lessons
from app.config import settings

app = FastAPI(
    title="Dance Coach API",
    description="API for dance coach business card website",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.environment == "development" else [
        "http://localhost:3000",
        "http://localhost",
        "http://nginx",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(leads.router, prefix="/api/v1")
app.include_router(slots.router, prefix="/api/v1")
app.include_router(subscriptions.router, prefix="/api/v1")
app.include_router(blog.router, prefix="/api/v1")
app.include_router(lessons.router, prefix="/api/v1")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Dance Coach API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

