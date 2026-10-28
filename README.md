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
Student_Record_API.postman_collection.json
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

Example request body for `POST` and `PUT`:

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "course": "Web Programming"
}
```

## Postman testing

Import `Student_Record_API.postman_collection.json` into Postman Desktop and send the requests to `http://localhost:5000`. For requests that use `:id`, replace the placeholder with the MongoDB `_id` returned by the create request.

The screenshots below show the recorded CRUD requests in order.

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
