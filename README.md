# Employee Task Tracker

A full-stack web application built to manage employees and track their assigned tasks. The application allows administrators to manage employee records, create tasks, assign tasks to employees, monitor task progress, and view dashboard analytics.

## Project Overview

The Employee Task Tracker helps teams organize employee information and manage daily work efficiently.

It provides a centralized dashboard where users can:

- Add, view, update, and delete employees.
- Create and assign tasks to employees.
- Track task status and progress.
- Set task priorities and due dates.
- Monitor employee workloads.
- View task statistics and dashboard analytics.
- Customize application appearance through Settings.

## Features

### 1. Dashboard

- Total employees count.
- Total tasks count.
- Completed tasks count.
- Pending tasks count.
- Overall task completion progress.
- Task status overview.
- Priority distribution.
- Employee workload chart.
- Recent tasks list.

### 2. Employee Management

- Add new employees.
- View all employees.
- Store employee name, email, and department.
- Update employee details.
- Delete employee records.

### 3. Task Management

- Create new tasks.
- Assign tasks to employees.
- Add task descriptions.
- Set task priority: High, Medium, Low.
- Set task due dates.
- Update task status:
  - Pending
  - In Progress
  - Completed
- Delete tasks.
- View assigned employee information.

### 4. Settings

- Update profile information.
- Configure notification preferences.
- Set default task priority.
- Change application appearance.
- Choose Beige, Light, or Dark theme.
- Enable or disable compact view.

*Note: Settings preferences are stored in browser localStorage. They are not currently persisted in PostgreSQL.*

## Technologies Used

| Layer | Technologies |
|---|---|
| Frontend | React, Vite |
| Styling | Tailwind CSS, Custom CSS |
| Routing | React Router DOM |
| Icons | Lucide React |
| API Integration | Axios |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Database Driver | Psycopg2 |
| API Documentation | Swagger UI |
| Version Control | Git, GitHub |

## Project Folder Structure

```text
Employee-Task-Tracker/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── employees.py
│   │       └── tasks.py
│   │
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── StatCard.jsx
│   │   │   │
│   │   │   ├── employee/
│   │   │   │   ├── EmployeeForm.jsx
│   │   │   │   └── EmployeeList.jsx
│   │   │   │
│   │   │   └── task/
│   │   │       ├── TaskForm.jsx
│   │   │       └── TaskList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employee.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── theme.css
│   │   │   ├── layout.css
│   │   │   ├── dashboard.css
│   │   │   ├── employees.css
│   │   │   ├── tasks.css
│   │   │   └── settings.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

*Folder structure reference: adjust filenames in this tree to match the actual files in your project.*

## Application Architecture

```text
                 USER
                   |
                   v
          REACT FRONTEND
             (Vite)
                   |
          React Components
                   |
             Axios Client
                   |
                   v
             FASTAPI BACKEND
                   |
              API Routers
                   |
             SQLAlchemy ORM
                   |
                   v
             POSTGRESQL
                   |
             DATABASE
```

### How the Application Works

1. The user interacts with the React frontend.
2. React components send HTTP requests using Axios.
3. FastAPI receives and processes the API requests.
4. SQLAlchemy communicates with the PostgreSQL database.
5. PostgreSQL stores and retrieves employee and task information.
6. FastAPI returns JSON responses.
7. React updates the user interface with the latest data.

## Database

Database: `employee_tracker_db`

### Employees Table

| Column | Description |
|---|---|
| id | Unique employee ID |
| name | Employee name |
| email | Employee email |
| department | Employee department |

### Tasks Table

| Column | Description |
|---|---|
| id | Unique task ID |
| title | Task title |
| description | Task description |
| employee_id | Assigned employee ID |
| priority | High, Medium, or Low |
| due_date | Task deadline |
| status | Pending, In Progress, or Completed |

The `employee_id` field connects a task to its assigned employee.

## Installation and Setup

### Prerequisites

Install the following before running the application:

- Python 3.10 or later
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Employee-Task-Tracker
```

### 2. Backend Setup

Open a terminal:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/employee_tracker_db
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

Create the PostgreSQL database named:

```sql
CREATE DATABASE employee_tracker_db;
```

Ensure your backend database configuration reads the `DATABASE_URL` environment variable.

### 4. Start the Backend Server

From the backend directory:

```bash
uvicorn app.main:app --reload
```

Backend URL:

http://127.0.0.1:8000

Swagger API documentation:

http://127.0.0.1:8000/docs

### 5. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

http://localhost:5173

## API Endpoints

Base URL:

`http://127.0.0.1:8000`

### Employee APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees/` | Get all employees |
| POST | `/api/employees/` | Create employee |
| GET | `/api/employees/{id}` | Get employee by ID |
| PATCH | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

### Task APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks/` | Get all tasks |
| POST | `/api/tasks/` | Create task |
| PATCH | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

## Frontend Pages

| Page | Route | Purpose |
|---|---|---|
| Dashboard | `/` | View statistics and analytics |
| Employees | `/employees` | Manage employees |
| Tasks | `/tasks` | Manage and track tasks |
| Settings | `/settings` | Configure application preferences |

## Application Theme

The application uses a Beige & Terracotta theme.

| UI Element | Color |
|---|---|
| Main Background | `#F7F3EE` |
| Sidebar | `#302720` |
| Cards | `#FFFDF9` |
| Primary Accent | `#C46A45` |
| Main Text | `#29231F` |
| Muted Text | `#82766D` |
| Borders | `#E8DED4` |
| Success | `#47866A` |
| Warning | `#D69A43` |
| Danger | `#C75C50` |

Additional Light and Dark appearance options are available in Settings.

## Testing the Application

### Backend API Testing

Use Swagger UI:

`http://127.0.0.1:8000/docs`

Test the employee and task endpoints using GET, POST, PATCH, and DELETE.

### Frontend Testing

1. Open the application in the browser.
2. Add an employee.
3. Verify the employee appears in the employee list.
4. Create a task and assign it to an employee.
5. Update the task status.
6. Verify dashboard statistics and charts update after refreshing the page.
7. Test delete operations.

## Security and Configuration

- Keep database credentials in environment variables.
- Never commit `.env` files to GitHub.
- Use `.env.example` files with placeholder values when sharing configuration.
- Configure CORS to allow the frontend development origin.
- Validate incoming API data using Pydantic schemas.

## Future Enhancements

- User authentication and role-based access control.
- Search and filtering for employees and tasks.
- Task pagination.
- Email and in-app notifications.
- Advanced reporting and analytics.
- Automated backend and frontend tests.
- Deployment using cloud hosting services.

