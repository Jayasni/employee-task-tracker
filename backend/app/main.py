import os
from dotenv import load_dotenv
from sqlalchemy import text

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app import models
from app.routers import employees, tasks

load_dotenv()

app = FastAPI(title="Employee Task Tracker API")

# Allow deployed frontend and local development
origins = [
    "http://localhost:5173",
    "https://employee-task-tracker-git-main-jayasni.vercel.app",
]

# Read additional frontend URL from environment variable
frontend_url = os.getenv("FRONTEND_URL")

if frontend_url and frontend_url not in origins:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(employees.router)
app.include_router(tasks.router)

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
