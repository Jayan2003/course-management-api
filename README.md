
# 📘 Course Management System

## 📌 Project Description

This project is a full-stack academic management system built with an **ASP.NET Core Web API** backend and a **React (Vite)** frontend. It manages **students, instructors, courses, enrollments, and instructor profiles**.

The system demonstrates important Web Engineering concepts such as:

* Entity relationships in Entity Framework Core
* Clean service-layer architecture using Dependency Injection
* DTO design and validation
* JWT Authentication via HttpOnly cookies and Role-based Authorization
* Optimized LINQ querying
* Background processing using Hangfire
* React SPA with client-side routing and theme switching

This project serves as the foundation for a scalable academic management system.

---

## 🧰 Technologies Used

### 🔹 ASP.NET Core Web API

Framework used to build RESTful HTTP endpoints.

### 🔹 Entity Framework Core

ORM used to manage database operations and relationships.

### 🔹 SQL Server

Relational database used to store application data.

### 🔹 JWT Authentication

Used to authenticate users and protect API endpoints. The token is stored in an **HttpOnly cookie** — never exposed to JavaScript.

### 🔹 Role-Based Authorization

Restricts access to endpoints based on user roles such as **Admin**.

### 🔹 Swagger (OpenAPI)

Provides interactive API documentation and testing interface.

### 🔹 Hangfire

Used to schedule background recurring jobs.

### 🔹 LINQ

Used for optimized query projection and data shaping.

### 🔹 React + Vite

Frontend SPA with client-side routing (React Router), dark/light theme toggle, and Axios for API calls.

---

## 🔗 Entity Relationships

The system implements the required database relationships:

### ✔ One-to-Many

**Instructor → Courses**

One instructor can teach multiple courses.

### ✔ Many-to-Many

**Students ↔ Courses (via Enrollment)**

Students can enroll in multiple courses and courses can contain multiple students.

### ✔ One-to-One

**Instructor ↔ InstructorProfile**

Each instructor has exactly one profile containing additional information.

---

## ⭐ Features

* CRUD operations for Students, Instructors, Courses
* Enrollment management system
* Instructor profile management
* DTO validation using Data Annotations
* Global exception handling middleware
* JWT authentication stored in HttpOnly cookies
* Role-based endpoint protection
* Optimized read-only queries using `AsNoTracking()`
* LINQ projection using `Select()`
* Background scheduled job to clean old enrollments
* React frontend with dark/light mode, form validation, and pre-filled edit forms

---

## 🔐 Authentication

User must authenticate using:

```
POST /api/Auth/login
```

Example Request:

```json
{
  "username": "admin",
  "password": "1234"
}
```

On successful login, the server sets an **HttpOnly cookie** (`jwt`) containing the token. The token is **not returned in the response body**.

All protected endpoints are authenticated automatically — the browser sends the cookie with every request. **No `Authorization` header is needed or used by the frontend.**

To log out:

```
POST /api/Auth/logout
```

This clears the cookie server-side.

---

## 🌐 CORS Configuration

CORS is configured in `Program.cs` to allow the React frontend to communicate with the backend.

Key settings:

* **Allowed origin:** `http://localhost:5173` (Vite dev server)
* **`AllowCredentials()`** is enabled so the browser includes the HttpOnly cookie on cross-origin requests
* **Allowed methods/headers:** all, to support GET, POST, PUT, DELETE with JSON bodies

Without `AllowCredentials()` and a matching allowed origin, the browser would block cookie transmission on every API call.

---

## 📡 API Endpoint Documentation

### 👨‍🎓 Students

| Method | Endpoint             | Description            | Auth Required |
| ------ | -------------------- | ---------------------- | ------------- |
| GET    | `/api/Students`      | Retrieve all students  | ✅ Any role   |
| GET    | `/api/Students/{id}` | Retrieve student by ID | ✅ Any role   |
| POST   | `/api/Students`      | Create new student     | ✅ Admin      |
| PUT    | `/api/Students/{id}` | Update student         | ✅ Admin      |
| DELETE | `/api/Students/{id}` | Delete student         | ✅ Admin      |

---

### 📚 Courses

| Method | Endpoint            | Description           | Auth Required |
| ------ | ------------------- | --------------------- | ------------- |
| GET    | `/api/Courses`      | Retrieve all courses  | ✅ Any role   |
| GET    | `/api/Courses/{id}` | Retrieve course by ID | ✅ Any role   |
| POST   | `/api/Courses`      | Create new course     | ✅ Admin      |
| PUT    | `/api/Courses/{id}` | Update course         | ✅ Admin      |
| DELETE | `/api/Courses/{id}` | Delete course         | ✅ Admin      |

---

### 👨‍🏫 Instructors

| Method | Endpoint                | Description               | Auth Required |
| ------ | ----------------------- | ------------------------- | ------------- |
| GET    | `/api/Instructors`      | Retrieve all instructors  | ✅ Any role   |
| GET    | `/api/Instructors/{id}` | Retrieve instructor by ID | ✅ Any role   |
| POST   | `/api/Instructors`      | Create instructor         | ✅ Admin      |
| PUT    | `/api/Instructors/{id}` | Update instructor         | ✅ Admin      |
| DELETE | `/api/Instructors/{id}` | Delete instructor         | ✅ Admin      |

---

### 🧾 Enrollments

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/Enrollments` | Enroll student in course |

Example Request:

```json
{
  "studentId": 1,
  "courseId": 1
}
```

---

### 🪪 Instructor Profile

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| POST   | `/api/InstructorProfiles` | Create instructor profile |

---

## 🖥 Frontend

### Frontend Routes

| Route              | Page              | Description      |
| ------------------ | ----------------- | ---------------- |
| `/`                | HomePage          | Landing page     |
| `/login`           | LoginPage         | Login form       |
| `/students`        | StudentsPage      | List all students |
| `/students/new`    | StudentFormPage   | Create student   |
| `/students/:id`    | StudentFormPage   | Edit student     |
| `/courses`         | CoursesPage       | List all courses |
| `/courses/new`     | CourseFormPage    | Create course    |
| `/courses/:id`     | CourseFormPage    | Edit course      |
| `/instructors`     | InstructorsPage   | List all instructors |
| `/instructors/new` | InstructorFormPage | Create instructor |
| `/instructors/:id` | InstructorFormPage | Edit instructor  |

### Authentication Flow

1. User submits credentials via `POST /api/auth/login`
2. Backend validates and sets an **HttpOnly cookie** (`jwt`)
3. Axios is configured with `withCredentials: true` — the browser includes the cookie automatically on every subsequent request
4. No token is stored in `localStorage` or `sessionStorage`
5. On logout, `POST /api/auth/logout` clears the cookie server-side

### API Routes Used by Frontend

| Purpose     | Endpoints                                      |
| ----------- | ---------------------------------------------- |
| Auth        | `POST /api/auth/login`, `POST /api/auth/logout` |
| Students    | `GET/POST/PUT/DELETE /api/Students`, `GET /api/Students/{id}` |
| Courses     | `GET/POST/PUT/DELETE /api/Courses`, `GET /api/Courses/{id}` |
| Instructors | `GET/POST/PUT/DELETE /api/Instructors`, `GET /api/Instructors/{id}` |

---

## ▶ How to Run the Project

Both the backend and frontend must run simultaneously.

### Backend

1️⃣ Install prerequisites:

* .NET 8 SDK
* SQL Server

2️⃣ Update the connection string in `Program.cs`.

3️⃣ Apply database migrations:

```
dotnet ef database update
```

4️⃣ Start the backend (runs on port **5043**):

```
dotnet run
```

5️⃣ Open Swagger UI:

```
http://localhost:5043/swagger
```

6️⃣ Open Hangfire Dashboard:

```
http://localhost:5043/hangfire
```

### Frontend

1️⃣ Navigate to the frontend folder:

```
cd frontend
```

2️⃣ Install dependencies:

```
npm install
```

3️⃣ Start the dev server (runs on port **5173**):

```
npm run dev
```

4️⃣ Open the app in a browser:

```
http://localhost:5173
```

> The frontend proxies API requests to `http://localhost:5043` — both servers must be running at the same time.

---

## 🍪 Why HTTP-Only Cookies Improve Security

HTTP-Only cookies prevent authentication tokens from being accessed through client-side JavaScript.

This significantly reduces the risk of:

* Cross-Site Scripting (XSS) attacks
* Token theft
* Session hijacking

Because the browser automatically sends cookies with requests, they provide a safer industry-standard approach for session management.

---

## ⏱ Background Job

A recurring Hangfire job runs daily to:

✔ Remove enrollments older than 90 days
✔ Keep the database clean
✔ Improve system performance

---

## 📸 Application Screenshots

All screenshots are located in the `Screenshots/ApplicationScreenshots/` folder.

| Screenshot | Description |
|---|---|
| `HomePage1.png` | Home page - Dark mode |
| `HomePage2.png` | Home page - scrolled view |
| `LightModeHomePage.png` | Home page - Light mode |
| `SignInPage.png` | Login page |
| `StudentsList.png` | Students list page |
| `AddNewStudent.png` | Add new student form |
| `EditStudent.png` | Edit student form (pre-filled) |
| `CoursesList.png` | Courses list page |
| `AddNewCourse.png` | Add new course form |
| `EditCourse.png` | Edit course form |
| `InstructorsList.png` | Instructors list page |
| `AddNewInstructor.png` | Add new instructor form |
| `EditInstructor.png` | Edit instructor form |
| `FailedCreating_Notsignedin.png` | Error when creating without login |
| `FailedLoading_NotSignedIn.png` | Error when loading without login |

---
