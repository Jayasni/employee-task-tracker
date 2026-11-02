
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app import crud, schemas


router = APIRouter(
    prefix="/api/employees",
    tags=["Employees"]
)


# CREATE EMPLOYEE
@router.post(
    "/",
    response_model=schemas.EmployeeResponse,
    status_code=status.HTTP_201_CREATED
)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):

    try:
        return crud.create_employee(db, employee)

    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="An employee with this email already exists"
        )


# GET ALL EMPLOYEES
@router.get(
    "/",
    response_model=list[schemas.EmployeeResponse]
)
def get_employees(db: Session = Depends(get_db)):

    return crud.get_employees(db)


# GET EMPLOYEE BY ID
@router.get(
    "/{employee_id}",
    response_model=schemas.EmployeeResponse
)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = crud.get_employee(db, employee_id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


# UPDATE EMPLOYEE
@router.patch(
    "/{employee_id}",
    response_model=schemas.EmployeeResponse
)
def update_employee(
    employee_id: int,
    employee: schemas.EmployeeUpdate,
    db: Session = Depends(get_db)
):

    try:
        updated_employee = crud.update_employee(
            db,
            employee_id,
            employee
        )

        if not updated_employee:
            raise HTTPException(
                status_code=404,
                detail="Employee not found"
            )

        return updated_employee

    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="An employee with this email already exists"
        )


# DELETE EMPLOYEE
@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = crud.delete_employee(db, employee_id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {
        "message": "Employee deleted successfully",
        "employee_id": employee_id
    }
