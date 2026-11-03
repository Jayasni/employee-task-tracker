from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    ForeignKey,
    Boolean
)
from sqlalchemy.orm import relationship

from app.database import Base

# Employee Model
class Employee(Base):

    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    department = Column(String(100), nullable=False)

    # One employee can have multiple tasks
    tasks = relationship(
        "Task",
        back_populates="employee",
        cascade="all, delete-orphan"
    )
# Task Model
class Task(Base):

    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    description = Column(Text, nullable=True)

    priority = Column(String(20), nullable=False)

    due_date = Column(Date, nullable=False)

    status = Column(
        String(30),
        default="Pending",
        nullable=False
    )

    employee_id = Column(
        Integer,
        ForeignKey("employees.id", ondelete="CASCADE"),
        nullable=False
    )

    # Each task belongs to one employee
    employee = relationship(
        "Employee",
        back_populates="tasks"
    )

class AdminSettings(Base):
    __tablename__ = "admin_settings"

    id = Column(Integer, primary_key=True, index=True)

    admin_name = Column(String(100), nullable=False, default="Admin")
    email = Column(String(150), nullable=False, default="admin@example.com")

    task_updates = Column(Boolean, default=True, nullable=False)
    overdue_reminders = Column(Boolean, default=True, nullable=False)

    default_priority = Column(String(20), default="Medium", nullable=False)

    compact_view = Column(Boolean, default=False, nullable=False)
    appearance = Column(String(20), default="beige", nullable=False)