Mini Task Tracker web application

A full-stack task tracking application built with FastAPI (backend) and React (frontend). 
This project uses React-Bootstrap (Bootstrap 5) for the frontend UI and SQLModel + SQLite for the backend.


PROJECT LAYOUT

TH-WORKS
    backend
        app
            __init__.py
            crud.py
            db.py
            main.py
            models.py
    frontend
        node_modules
        public
        src
            assets
            components
                Insights.jsx
                TaskForm.jsx
                TaskList.jsx
            api.js
            App.jsx
            main.jsx
        .gitignore
        eslint.config.js
        index.html
        package-lock.json
        package.json
        vite.config.js
        

PREREQUISITES

node.js(version 16+) and npm
python(3.10+)
pip


STEPS TO RUN FASTAPI SERVER LOCALLY

1. Open a terminal and go to the `backend` folder:

cd backend

2. Create and activate a virtual environment

python -m venv myenv

3. Activate the virtual environment
go inside myenv in that go inside scripts in terminalthen activate it using

activate.bat

4. come to backend folder in terminal and install Python dependencies

pip install fastapi uvicorn sqlmodel pydantic

5. Start the FastAPI server

uvicorn app.main:app --reload


STEPS TO RUN REACT SERVER

1. Open a new terminal and go to the frontend folder

2. Install node modules

npm install

3. Start the server

npm run dev


Since I have included the react-bootstrap and axios dependencies in package.json file there is no need to download it externally 




