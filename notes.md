
FRONTEND: React with React-Bootstrap (Bootstrap 5) 
BACKEND: FastAPI with SQLModel and SQLite 


DATABASE SCHEMA (models.py)
The backend defines a single table, Task, representing individual to-do items.
Each record includes:

1. id — integer primary key

2. title — short task title (string)

3. description — optional longer text description

4. priority — string, defaults to "Medium" (allowed values: Low / Medium / High)

5. due_date — optional date field for task deadlines

6. status — string, defaults to "open" (possible values: open / done)

7. created_at — timestamp automatically set when the task is created

8. Indexes are created on due_date, priority, and status to support fast filtering and sorting.



Backend Logic
The backend logic lives mainly in crud.py, which handles all database operations:

1. create_task — inserts a new task into the database.

2. get_tasks(status, priority) — retrieves tasks with optional filters and sorts them by due date.

3. patch_task — performs partial updates using the TaskUpdate Pydantic model.

4. compute_insights — calculates quick metrics such as:
    1. Total open tasks
    2. Tasks due within the next 3 days
    3. High-priority open tasks

Other backend files:

db.py — defines the database engine and a get_session() helper.

main.py — initializes the app, creates tables on startup via init_db(), and configures CORS for local development (http://localhost:5173, http://127.0.0.1:5173).


FRONTEND BEHAVIOR

1. App.jsx manages global state, loads tasks and insights, and re-fetches data when filters change.

2. TaskForm.jsx allows users to create new tasks and clears the form after submission.

3. TaskList.jsx displays tasks, supports filtering by status/priority, and lets users toggle a task’s “done” state.

4. Insights.jsx shows summary statistics (like open tasks, due soon, and high priority) with a refresh button.


CODE REFERENCE

Backend entry - backend/app/main.py
Models - backend/app/models.py
CRUD logic - backend/app/crud.py
DB session setup - backend/app/db.py
Frontend - frontend/src/App.jsx
React components - frontend/src/components/ 