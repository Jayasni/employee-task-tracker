
from pydantic import BaseModel, Field, EmailStr, ConfigDict
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

class SettingsBase(BaseModel):
    admin_name: str = Field(default="Admin", alias="adminName")
    email: str = Field(default="admin@example.com", alias="email")

    task_updates: bool = Field(default=True, alias="taskUpdates")
    overdue_reminders: bool = Field(
        default=True,
        alias="overdueReminders"
    )

    default_priority: str = Field(
        default="Medium",
        alias="defaultPriority"
    )

    compact_view: bool = Field(default=False, alias="compactView")
    appearance: str = "beige"

    model_config = ConfigDict(populate_by_name=True)


class SettingsResponse(SettingsBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )