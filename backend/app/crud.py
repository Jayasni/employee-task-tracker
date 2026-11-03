from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.schemas import SettingsBase

from app import models, schemas
# CREATE EMPLOYEE
def create_employee(db: Session, employee: schemas.EmployeeCreate):

    db_employee = models.Employee(
        name=employee.name,
        email=employee.email,
        department=employee.department
    )

    try:
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)

        return db_employee
    except IntegrityError:
        db.rollback()
        raise

    # GET ALL EMPLOYEES
def get_employees(db: Session):

    return db.query(models.Employee).order_by(
        models.Employee.id.desc()
    ).all()

# GET EMPLOYEE BY ID
def get_employee(db: Session, employee_id: int):

    return db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

  
# UPDATE EMPLOYEE
def update_employee(
    db: Session,
    employee_id: int,
    employee_data: schemas.EmployeeUpdate
):

    db_employee = get_employee(db, employee_id)

    if not db_employee:
        return None

    update_data = employee_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_employee, key, value)

    try:
        db.commit()
        db.refresh(db_employee)

        return db_employee

    except IntegrityError:
        db.rollback()
        raise


# DELETE EMPLOYEE
def delete_employee(db: Session, employee_id: int):

    db_employee = get_employee(db, employee_id)

    if not db_employee:
        return None

    db.delete(db_employee)
    db.commit()

    return db_employee

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(**task.model_dump())

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


def get_tasks(db: Session):
    return db.query(models.Task).order_by(models.Task.id.desc()).all()


def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()


def update_task(db: Session, task_id: int, task_data: schemas.TaskUpdate):
    db_task = get_task(db, task_id)

    if not db_task:
        return None

    update_data = task_data.model_dump(
        exclude_unset=True,
        exclude_none=True
    )

    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)

    return db_task


def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)

    if not db_task:
        return None

    db.delete(db_task)
    db.commit()

    return db_task

def get_admin_settings(db: Session):
    settings = (
        db.query(models.AdminSettings)
        .filter(models.AdminSettings.id == 1)
        .first()
    )

    # Create default settings if they don't exist
    if not settings:
        settings = models.AdminSettings(id=1)
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


def update_admin_settings(
    db: Session,
    settings_data: SettingsBase
):
    settings = get_admin_settings(db)

    update_data = settings_data.model_dump()

    for key, value in update_data.items():
        setattr(settings, key, value)

    db.commit()
    db.refresh(settings)

    return settings
