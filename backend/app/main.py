
import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import engine, Base
from app import models
from app.routers import employees, tasks


# Load environment variables from backend/.env
load_dotenv()

# Read frontend URL from environment
FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

# Initialize FastAPI
app = FastAPI(
    title="Employee Task Tracker API",
    description="Manage employees and their assigned tasks",
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Register API routers
app.include_router(employees.router)
app.include_router(tasks.router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home route
@app.get("/")
def home():
    return {
        "message": "Employee Task Tracker API is running"
    }


# Database connection test
@app.get("/test-db")
def test_database():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "success",
            "message": "PostgreSQL connected successfully!"
        }

    except Exception as error:
        return {
            "status": "error",
            "message": str(error)
        }
