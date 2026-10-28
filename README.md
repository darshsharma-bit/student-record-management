# Student Record Management System

A simple web application for managing student records, built as a Web Programming project. It uses a server-rendered Handlebars interface, an Express REST API, and MongoDB for persistent storage.

**Stack:** Node.js · Express · Handlebars · MongoDB Atlas · Mongoose · Vanilla JavaScript

## Features

- Add, view, edit, and delete student records.
- Store student name, email, and course in MongoDB.
- Render the student list using Handlebars.
- Validate input in the browser and with Mongoose.
- Test CRUD endpoints with Postman.

## Tech stack

| Technology | Purpose |
|---|---|
| HTML, CSS, JavaScript | Form, table, styling, and browser interactions |
| Node.js, Express | Server and request routing |
| Handlebars | Server-rendered HTML |
| MongoDB Atlas, Mongoose | Persistent data storage and schema validation |
| Postman | REST API testing |

## Project structure

```text
config/db.js                         # MongoDB connection
models/Student.js                    # Student schema and model
controllers/studentController.js    # UI and API logic
routes/studentRoutes.js              # Browser routes
routes/studentApiRoutes.js           # JSON API routes
views/                               # Handlebars templates
public/css/style.css                 # Styles
public/js/script.js                  # Browser-side JavaScript
screenshots/                         # Postman test screenshots
Student_Record_API.postman_collection.json # Postman collection
app.js                               # Express configuration
server.js                            # Application entry point
.env.example                         # Environment template
```

## Run locally

### Requirements

- [Node.js](https://nodejs.org/) and npm
- A [MongoDB Atlas](https://www.mongodb.com/atlas) deployment (or another MongoDB connection)
- [Postman Desktop](https://www.postman.com/downloads/) for API testing

### 1. Install dependencies

```bash
git clone https://github.com/darshsharma-bit/student-record-management.git
cd student-record-management
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env`.

PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS / Linux:

```bash
cp .env.example .env
```

Then set your own MongoDB connection string in `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/studentDB?retryWrites=true&w=majority
```

Replace the placeholders with your Atlas details. In Atlas, create a database user and allow access from your current IP address. Keep `.env` private; never commit credentials.

### 3. Start the server

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

## REST API

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | List all students |
| `POST` | `/api/students` | Create a student |
| `GET` | `/api/students/:id` | Get a student by MongoDB ID |
| `PUT` | `/api/students/:id` | Update a student |
| `DELETE` | `/api/students/:id` | Delete a student |

### Sample Request (`POST` / `PUT`)

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "course": "Web Programming"
}
```

### Sample Response (`201 Created`)

```json
{
  "success": true,
  "message": "Student record created successfully",
  "data": {
    "_id": "6ae23726109f1750c9ee66ec",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "course": "Web Programming",
    "createdAt": "2026-10-28T17:55:50.238Z",
    "updatedAt": "2026-10-28T17:55:50.238Z"
  }
}
```

## Postman testing

The project includes `Student_Record_API.postman_collection.json` covering 8 test cases:

1. `GET /api/students` — Retrieve all students (`200 OK`)
2. `POST /api/students` — Create a new student (`201 Created`)
3. `GET /api/students/:id` — Retrieve student by ID (`200 OK`)
4. `PUT /api/students/:id` — Update student (`200 OK`)
5. `DELETE /api/students/:id` — Delete student (`200 OK`)
6. `GET /api/students/invalid-id` — Malformed ID validation (`400 Bad Request`)
7. `GET /api/students/<nonexistent-id>` — Non-existent student (`404 Not Found`)
8. `POST /api/students` — Missing required fields validation (`400 Bad Request`)

Import `Student_Record_API.postman_collection.json` into Postman Desktop and run requests against `http://localhost:5000`. For requests using `:id`, substitute a valid MongoDB `_id`.

<details>
<summary>View Postman test screenshots</summary>

### GET — List students
![GET all students](screenshots/1-get-all-students.png)

### POST — Create student
![POST create student](screenshots/2-post-create-student.png)

### GET — Retrieve by ID
![GET student by ID](screenshots/3-get-student-by-id.png)

### PUT — Update student
![PUT update student](screenshots/4-put-update-student.png)

### DELETE — Delete student
![DELETE student](screenshots/5-delete-student.png)

</details>

## Troubleshooting

- **MongoDB Connection Error (`SSL alert number 80` / `ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR`):**  
  MongoDB Atlas blocks connection attempts from unauthorized IP addresses. In the Atlas dashboard, navigate to **Security** > **Network Access** and ensure your current public IP address is active in the access list.
- **Port Conflict (`EADDRINUSE: address already in use :::5000`):**  
  Another application or background node process is utilizing port 5000. Either terminate the process or change `PORT=5001` in your local `.env` file.
- **Invalid ID Format (`400 Bad Request` vs `404 Not Found`):**  
  MongoDB requires a 24-character hexadecimal string for document IDs. Malformed strings return `400 Bad Request` (client input error), whereas properly formatted 24-character IDs that do not exist in the database return `404 Not Found`.
