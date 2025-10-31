from datetime import date, datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Index

class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    priority: str = Field( default='Medium',description="Low/Medium/High")
    due_date: Optional[date] = None
    status: str = Field(default="open", description="open/done")

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    __table_args__ = (
        Index("ix_task_due_date", "due_date"),
        Index("ix_task_priority", "priority"),
        Index("ix_task_status", "status"),
    )

class TaskCreate(TaskBase):
    pass

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[date] = None
    status: Optional[str] = None
