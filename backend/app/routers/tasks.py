from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas, models

router = APIRouter(
    prefix="/api/tasks",
    tags=["Tasks"]
)


@router.post("/", response_model=schemas.TaskResponse,
             status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):

    employee = db.query(models.Employee).filter(
        models.Employee.id == task.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    created_task = crud.create_task(db, task)

    return {
        "id": created_task.id,
        "title": created_task.title,
        "description": created_task.description,
        "priority": created_task.priority,
        "due_date": created_task.due_date,
        "status": created_task.status,
        "employee_id": created_task.employee_id,
        "employee_name": created_task.employee.name
    }


@router.get("/", response_model=list[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db)

    return [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "due_date": task.due_date,
            "status": task.status,
            "employee_id": task.employee_id,
            "employee_name": task.employee.name
        }
        for task in tasks
    ]


@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "due_date": task.due_date,
        "status": task.status,
        "employee_id": task.employee_id,
        "employee_name": task.employee.name
    }


@router.patch("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int,
    task_data: schemas.TaskUpdate,
    db: Session = Depends(get_db)
):
    if task_data.employee_id is not None:
        employee = db.query(models.Employee).filter(
            models.Employee.id == task_data.employee_id
        ).first()

        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")

    task = crud.update_task(db, task_id, task_data)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "due_date": task.due_date,
        "status": task.status,
        "employee_id": task.employee_id,
        "employee_name": task.employee.name
    }


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.delete_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task deleted successfully"}