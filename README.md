
# 📘 Course Management System API

## 📌 Project Description

This project is an ASP.NET Core Web API that manages **students, instructors, courses, enrollments, and instructor profiles**.

The system demonstrates important Web Engineering concepts such as:

* Entity relationships in Entity Framework Core
* Clean service-layer architecture using Dependency Injection
* DTO design and validation
* JWT Authentication and Role-based Authorization
* Optimized LINQ querying
* Background processing using Hangfire

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

Used to authenticate users and protect API endpoints.

### 🔹 Role-Based Authorization

Restricts access to endpoints based on user roles such as **Admin**.

### 🔹 Swagger (OpenAPI)

Provides interactive API documentation and testing interface.

### 🔹 Hangfire

Used to schedule background recurring jobs.

### 🔹 LINQ

Used for optimized query projection and data shaping.

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
* JWT authentication with secure token validation
* Role-based endpoint protection
* Optimized read-only queries using `AsNoTracking()`
* LINQ projection using `Select()`
* Background scheduled job to clean old enrollments

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

The API returns a **JWT token**.

All protected endpoints require sending the token in the header:

```
Authorization: Bearer {token}
```

---

## 📡 API Endpoint Documentation

### 👨‍🎓 Students

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/Students`      | Retrieve all students  |
| GET    | `/api/Students/{id}` | Retrieve student by ID |
| POST   | `/api/Students`      | Create new student     |
| PUT    | `/api/Students/{id}` | Update student         |
| DELETE | `/api/Students/{id}` | Delete student         |

---

### 📚 Courses

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/Courses`      | Retrieve all courses |
| POST   | `/api/Courses`      | Create new course    |
| PUT    | `/api/Courses/{id}` | Update course        |
| DELETE | `/api/Courses/{id}` | Delete course        |

---

### 👨‍🏫 Instructors

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| GET    | `/api/Instructors`      | Retrieve all instructors |
| POST   | `/api/Instructors`      | Create instructor        |
| PUT    | `/api/Instructors/{id}` | Update instructor        |
| DELETE | `/api/Instructors/{id}` | Delete instructor        |

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

## ▶ How to Run the Project

1️⃣ Install:

* .NET SDK
* SQL Server

2️⃣ Update the connection string in `Program.cs`.

3️⃣ Apply database migrations:

```
dotnet ef database update
```

4️⃣ Run the project:

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

## 📸 Screenshots

Screenshots from Swagger demonstrating working endpoints are included in the project submission.

---


