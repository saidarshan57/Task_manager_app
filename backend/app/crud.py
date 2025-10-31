from typing import List, Optional
from sqlmodel import select
from .models import Task, TaskCreate, TaskUpdate
from .db import get_session
from datetime import date, timedelta




def create_task(task_in: TaskCreate) -> Task:
    with get_session() as session:
        t = Task.from_orm(task_in)
        session.add(t)
        session.commit()
        session.refresh(t)
        return t


def get_tasks(status: Optional[str] = None, priority: Optional[str] = None) -> List[Task]:
    with get_session() as session:
        stmt = select(Task)
        if status:
            stmt = stmt.where(Task.status == status)
        if priority:
            stmt = stmt.where(Task.priority == priority)
        stmt = stmt.order_by(Task.due_date)
        return session.exec(stmt).all()


def patch_task(task_id: int, data: TaskUpdate) -> Optional[Task]:
    with get_session() as session:
        task = session.get(Task, task_id)
        if not task:
            return None
        for key, value in data.dict(exclude_unset=True).items():
            setattr(task, key, value)
        session.add(task)
        session.commit()
        session.refresh(task)
        return task


def compute_insights():
    with get_session() as session:
        tasks = session.exec(select(Task)).all()

    open_tasks = [t for t in tasks if t.status == "open"]

    today = date.today()
    due_soon_open = [
        t for t in open_tasks if t.due_date and t.due_date <= (today + timedelta(days=3))
    ]
    high_priority_open = [t for t in open_tasks if t.priority == "high"]

    total_open = len(open_tasks)
    due_soon = len(due_soon_open)
    high_priority = len(high_priority_open)

    return {
        "total_open_tasks": total_open,
        "due_soon_open_tasks": due_soon,
        "high_priority_open_tasks": high_priority,
        "readable": make_readable_summary(total_open, due_soon, high_priority),
    }


def make_readable_summary(total_open: int, due_soon: int, high_priority: int) -> str:
    if total_open == 0:
        return "No open tasks — all caught up! 🎉"

    summary = f"You have {total_open} open tasks. "
    summary += f"{due_soon} are due within 3 days, " if due_soon else "No tasks due soon, "
    
