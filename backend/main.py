from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from app.db import init_db
from app.crud import create_task, get_tasks, patch_task, compute_insights
from app.models import TaskCreate, TaskUpdate

app = FastAPI(title="Mini Task Tracker")

origins = [
    "http://localhost:5173",   
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


@app.post("/tasks")
def api_create_task(task: TaskCreate):
    t = create_task(task)
    return {"ok": True, "task": t}

@app.get("/tasks")
def api_get_tasks(status: Optional[str] = Query(None), priority: Optional[str] = Query(None)):
    tasks = get_tasks(status=status, priority=priority)
    return {"ok": True, "tasks": tasks}

@app.patch("/tasks/{task_id}")
def api_patch_task(task_id: int, data: TaskUpdate):
    t = patch_task(task_id, data)
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"ok": True, "task": t}

@app.get("/insights")
def api_insights():
    return {"ok": True, "insights": compute_insights()}
