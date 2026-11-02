
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import date


# Common employee fields
class EmployeeBase(BaseModel):

    name: str = Field(
        min_length=2,
        max_length=100
    )

    email: EmailStr

    department: str = Field(
        min_length=2,
        max_length=100
    )


# Schema for creating an employee
class EmployeeCreate(EmployeeBase):
    pass


# Schema for updating an employee
class EmployeeUpdate(BaseModel):

    name: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=100
    )

    email: Optional[EmailStr] = None

    department: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=100
    )


# Schema for returning employee information
class EmployeeResponse(EmployeeBase):

    id: int

    model_config = {
        "from_attributes": True
    }
class TaskBase(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    description: Optional[str] = None
    priority: str = Field(default="Medium")
    due_date: date
    employee_id: int = Field(gt=0)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=2, max_length=200)
    description: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[date] = None
    status: Optional[str] = None
    employee_id: Optional[int] = Field(default=None, gt=0)

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    priority: str
    due_date: date
    status: str
    employee_id: int
    employee_name: str

    model_config = {"from_attributes": True}