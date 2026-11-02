# <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/graduation-cap.svg" width="32" height="32" valign="middle" /> Student Record Management System — REST API

A lightweight, robust, and beginner-friendly **Backend RESTful API** for managing student records, built for a university Web Programming course. This project focuses on backend architecture, database modeling, CRUD API design, error handling, and automated API testing.

---

### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/layer-group.svg" width="18" height="18" valign="middle" /> Built With & Powered By

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)

---

## <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/list-check.svg" width="20" height="20" valign="middle" /> Features

- <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/bolt.svg" width="14" height="14" valign="middle" /> **Full CRUD Operations:** Comprehensive endpoints to create, retrieve, update, and delete student documents.
- <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/database.svg" width="14" height="14" valign="middle" /> **Cloud Persistence:** Seamless connection to MongoDB Atlas with Mongoose ODM schemas and models.
- <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/shield-halved.svg" width="14" height="14" valign="middle" /> **Data Validation:** Enforces required fields, minimum character lengths, valid email regex patterns, and unique email constraints.
- <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/lock.svg" width="14" height="14" valign="middle" /> **Secure Architecture:** Centralized error-handling middleware preventing internal stack trace leaks; environment variables kept strictly private.
- <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/traffic-light.svg" width="14" height="14" valign="middle" /> **Standard HTTP Status Codes:** Returns semantic status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Server Error`).
- <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/vial-circle-check.svg" width="14" height="14" valign="middle" /> **Automated API Testing:** Verified with Postman covering both happy paths and negative validation test cases.

---

## <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/gears.svg" width="20" height="20" valign="middle" /> Tech Stack

| Technology | Role & Purpose | Badge / Icon |
| :--- | :--- | :---: |
| **Node.js** | Server-side JavaScript runtime environment | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) |
| **Express.js** | Backend web framework and API route handler | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| **MongoDB Atlas** | Cloud NoSQL document database | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) |
| **Mongoose** | Object Data Modeling (ODM) library and schema validator | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) |
| **Postman** | REST API testing, collection runner, and verification | ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white) |

---

## <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/folder-tree.svg" width="20" height="20" valign="middle" /> Project Structure

```text
student-record-management/
├── 📁 config/
│   └── db.js                              # MongoDB connection lifecycle & error handling
├── 📁 controllers/
│   └── studentController.js               # Clean REST API CRUD controller logic
├── 📁 middleware/
│   └── errorMiddleware.js                 # Centralized 404 & global error handling
├── 📁 models/
│   └── Student.js                         # Mongoose schema and model definition
├── 📁 routes/
│   └── studentRoutes.js                   # Express REST API routes (/api/students)
├── 📁 screenshots/                        # Verified Postman test execution screenshots
│   ├── 1-get-all-students.png
│   ├── 2-post-create-student.png
│   ├── 3-get-student-by-id.png
│   ├── 4-put-update-student.png
│   └── 5-delete-student.png
├── 📄 .env.example                        # Safe environment variables template
├── 📄 .gitignore                          # Excludes .env, .env.*, and node_modules
├── 📄 app.js                              # Express app configuration & middleware
├── 📄 package.json                        # Dependencies and npm scripts
├── 📄 README.md                           # Documentation with Font Awesome icons
├── 📄 server.js                           # Server entry point & DB connection guard
└── 📄 Student_Record_API.postman_collection.json # 8-request Postman test collection
```

---

## <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/terminal.svg" width="20" height="20" valign="middle" /> Prerequisites & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or newer) and npm
- [Git](https://git-scm.com/)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) deployment (or local MongoDB)
- [Postman Desktop](https://www.postman.com/downloads/) for API testing

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/darshsharma-bit/student-record-management.git
cd student-record-management
npm install
```

### 2. Configure Environment Variables

Create your local `.env` file from the provided template:

**PowerShell (Windows):**
```powershell
Copy-Item .env.example .env
```

**Bash (macOS / Linux):**
```bash
cp .env.example .env
```

Configure your MongoDB Atlas connection string in `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/studentDB?retryWrites=true&w=majority
```

> <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/lock.svg" width="14" height="14" valign="middle" /> **Security Notice:** Never commit `.env` to Git. Your database password and cluster URL must remain private. Ensure your current public IP is added under **Security > Network Access** in MongoDB Atlas.

### 3. Start the Server

```bash
# Development mode (auto-reload on code changes)
npm run dev

# Production mode
npm start
```

Base URL: `http://localhost:5000`

---

## <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/network-wired.svg" width="20" height="20" valign="middle" /> REST API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint | Description | Success Status |
| :---: | :--- | :--- | :---: |
| `GET` | `/` | API status and route discovery | `200 OK` |
| `GET` | `/api/students` | Retrieve all student records | `200 OK` |
| `POST` | `/api/students` | Create a new student record | `201 Created` |
| `GET` | `/api/students/:id` | Retrieve a single student by MongoDB ID | `200 OK` |
| `PUT` | `/api/students/:id` | Update an existing student's details | `200 OK` |
| `DELETE` | `/api/students/:id` | Delete a student record from the database | `200 OK` |

### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/file-code.svg" width="16" height="16" valign="middle" /> Sample Request Body (`POST` / `PUT`)

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "course": "Computer Science"
}
```

### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/file-lines.svg" width="16" height="16" valign="middle" /> Sample Response (`201 Created`)

```json
{
  "success": true,
  "message": "Student record created successfully",
  "data": {
    "_id": "6ae891a2f35b68e72ec74900",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "course": "Computer Science",
    "createdAt": "2026-11-02T13:35:28.120Z",
    "updatedAt": "2026-11-02T13:35:28.120Z"
  }
}
```

---

## <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/flask.svg" width="20" height="20" valign="middle" /> Postman API Testing & Verification

The project includes `Student_Record_API.postman_collection.json` in the root folder, covering 8 test cases:

1. `GET /api/students` — Retrieve all students (`200 OK`)
2. `POST /api/students` — Create student (`201 Created`)
3. `GET /api/students/:id` — Retrieve student by ID (`200 OK`)
4. `PUT /api/students/:id` — Update student (`200 OK`)
5. `DELETE /api/students/:id` — Delete student (`200 OK`)
6. `GET /api/students/invalid-id` — Malformed ID validation (`400 Bad Request`)
7. `GET /api/students/<nonexistent-id>` — Non-existent student (`404 Not Found`)
8. `POST /api/students` — Missing required fields validation (`400 Bad Request`)

### How to Import
1. Open **Postman Desktop**.
2. Click **Import** in the top-left navigation bar.
3. Select `Student_Record_API.postman_collection.json`.
4. Run requests against `http://localhost:5000`.

---

## <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/camera.svg" width="20" height="20" valign="middle" /> Test Execution Evidence

All test results below are statically displayed and verified directly against the running API:

### 1. 🟢 GET — Retrieve All Students (`200 OK`)
![GET All Students](screenshots/1-get-all-students.png)

---

### 2. 🔵 POST — Create Student (`201 Created`)
![POST Create Student](screenshots/2-post-create-student.png)

---

### 3. 🟡 GET by ID — Retrieve Student by ID (`200 OK`)
![GET Student by ID](screenshots/3-get-student-by-id.png)

---

### 4. 🟠 PUT — Update Student (`200 OK`)
![PUT Update Student](screenshots/4-put-update-student.png)

---

### 5. 🔴 DELETE — Remove Student (`200 OK`)
![DELETE Student](screenshots/5-delete-student.png)

---

## <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/triangle-exclamation.svg" width="20" height="20" valign="middle" /> Troubleshooting

- **MongoDB Connection Error (`SSL alert number 80` / `ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR`):**  
  MongoDB Atlas drops connections from unwhitelisted IP addresses. In the Atlas dashboard, go to **Security > Network Access** and click **Add Current IP Address**.
- **Port Conflict (`EADDRINUSE :::5000`):**  
  Another background process is using port 5000. Stop that process or set `PORT=5001` in your `.env` file.
- **Malformed ID (`400 Bad Request` vs `404 Not Found`):**  
  MongoDB requires 24-character hexadecimal IDs. Invalid string formats return `400 Bad Request`. Valid 24-character IDs not present in the database return `404 Not Found`.
