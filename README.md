# Student Record Management System

A simple, beginner-friendly web programming project built using **Node.js**, **Express.js**, **Handlebars**, and **MongoDB Atlas (Mongoose)** following the Model-View-Controller (MVC) architectural pattern.

This project was built for university Web Programming syllabus evaluation and demonstrates complete **CRUD** (Create, Read, Update, Delete) functionality with both an interactive web UI and RESTful JSON API endpoints for Postman testing.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Prerequisites](#prerequisites)
5. [MongoDB Atlas Setup Guide](#mongodb-atlas-setup-guide)
6. [Installation & Running Locally](#installation--running-locally)
7. [REST API Documentation (Postman)](#rest-api-documentation-postman)
8. [Testing with Postman](#testing-with-postman)
9. [Git & GitHub Guide](#git--github-guide)
10. [Viva Voce & Code Explanation Guide](#viva-voce--code-explanation-guide)

---

## 1. Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (DOM manipulation & event handling)
- **Templating Engine:** Handlebars (`express-handlebars`)
- **Backend Framework:** Node.js & Express.js
- **Database:** MongoDB Atlas (Cloud NoSQL)
- **Object Data Modeling (ODM):** Mongoose
- **API Testing:** Postman
- **Version Control:** Git & GitHub

No complex frontend frameworks (React/Vue/Angular), TypeScript, or heavy unnecessary libraries are used. The project is strictly designed for clarity, understanding, and academic explanation.

---

## 2. Project Structure

```text
student-record-management/
├── models/
│   └── Student.js               # Mongoose schema and model for Student data
├── controllers/
│   └── studentController.js     # Business logic for UI and REST API operations
├── routes/
│   ├── studentRoutes.js         # Web page routes (serves Handlebars templates)
│   └── studentApiRoutes.js      # REST API JSON endpoints (for Postman)
├── views/
│   ├── layouts/
│   │   └── main.handlebars      # Base HTML layout skeleton
│   └── students/
│       └── index.handlebars     # Main UI with Student Form and Records Table
├── public/
│   ├── css/
│   │   └── style.css            # Custom CSS styling (responsive, clean design)
│   └── js/
│       └── script.js            # Client-side DOM manipulation & validation
├── config/
│   └── db.js                    # MongoDB Atlas Mongoose connection setup
├── screenshots/                 # Verified Postman test run execution screenshots
│   ├── 1-get-all-students.png
│   ├── 2-post-create-student.png
│   ├── 3-get-student-by-id.png
│   ├── 4-put-update-student.png
│   └── 5-delete-student.png
├── Student_Record_API.postman_collection.json  # Ready-to-import Postman collection
├── app.js                       # Express app configuration & middleware
├── server.js                    # Server entry point (starts listener & loads .env)
├── .env.example                 # Template for environment variables
├── .gitignore                   # Ignores node_modules and .env
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation & viva guide
```

---

## 3. Features

1. **Add Student (Create):** Fill in Name, Email, and Course to save a record into MongoDB Atlas.
2. **View Students (Read):** Dynamically renders all registered students in a formatted table via Handlebars.
3. **Edit Student (Update):** Clicking "Edit" populates the form using client-side DOM manipulation, changes mode to "Update Student", and updates the record in MongoDB.
4. **Delete Student (Delete):** Clicking "Delete" prompts a native browser confirmation before removing the document from MongoDB.
5. **Client-Side Form Validation:** Validates required fields and email regex pattern before submission.
6. **REST API Endpoints:** 5 fully documented endpoints for Postman evaluation returning appropriate HTTP status codes (200, 201, 400, 404, 500).

---

## 4. Prerequisites

Ensure you have the following installed on your computer:
- [Node.js](https://nodejs.org/) (Version 18.x or newer)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/downloads/) (for API testing)
- A free account on [MongoDB Atlas](https://www.mongodb.com/atlas/database)

---

## 5. MongoDB Atlas Setup Guide

Follow these steps to connect your MongoDB Atlas cloud database:

### Step 1: Create a Free Cluster
1. Sign in to your account at [cloud.mongodb.com](https://cloud.mongodb.com/).
2. Create a new cluster and select the **M0 Free (Shared)** tier.
3. Choose any cloud provider (e.g., AWS) and region nearest to you.
4. Click **Create Deployment**.

### Step 2: Create a Database User
1. In the left sidebar, click **Database Access** (under *Security*).
2. Click the green **+ Add New Database User** button.
3. Select **Password** authentication method.
4. Enter a Username (e.g. `studentAdmin`) and a secure Password (e.g. `University2026!`).  
   *(Note down this username and password; you will need them in `.env`)*.
5. Under **Database User Privileges**, select **Read and write to any database**.
6. Click **Add User**.

### Step 3: Configure Network Access (IP Whitelist)
1. In the left sidebar, click **Network Access** (under *Security*).
2. Click **+ Add IP Address**.
3. Click **Allow Access from Anywhere** (adds `0.0.0.0/0`).  
   *(This ensures your local Node.js application can connect from your home, campus, or mobile hotspot).*
4. Click **Confirm**.

### Step 4: Get your Connection String
1. In the left sidebar, click **Database** to view your cluster.
2. Click the **Connect** button on your cluster.
3. Choose **Drivers** (Node.js).
4. Copy the connection string provided. It will look like this:
   ```text
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Configure your `.env` file
1. In your project root, make a copy of `.env.example` and name it `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` in your editor and paste your connection string. Replace `<username>` and `<password>` with the database credentials you created in Step 2, and add `/studentDB` before `?`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://studentAdmin:University2026!@cluster0.abcde.mongodb.net/studentDB?retryWrites=true&w=majority
   ```

---

## 6. Installation & Running Locally

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 2: Start the Application
For production / normal mode:
```bash
npm start
```

For development mode (with automatic server restart on file changes using `nodemon`):
```bash
npm run dev
```

### Step 3: Open in Browser
Open your browser and navigate to:
```text
http://localhost:5000
```
You will see the **Student Record Management System** web interface.

---

## 7. REST API Documentation (Postman)

The application provides 5 RESTful JSON endpoints under `/api/students`:

| Method | Endpoint | Description | Success Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/students` | Retrieve list of all student records | `200 OK` |
| **POST** | `/api/students` | Create and save a new student | `201 Created` |
| **GET** | `/api/students/:id` | Retrieve single student by MongoDB ID | `200 OK` |
| **PUT** | `/api/students/:id` | Update an existing student's details | `200 OK` |
| **DELETE** | `/api/students/:id` | Remove a student record by ID | `200 OK` |

### Sample JSON Request Bodies

#### POST `/api/students` (Add Student)
```json
{
  "name": "Darsh Sharma",
  "email": "darsh@university.edu",
  "course": "Computer Science"
}
```

#### PUT `/api/students/:id` (Update Student)
```json
{
  "name": "Darsh Sharma",
  "email": "darsh.updated@university.edu",
  "course": "Full Stack Web Development"
}
```

### Sample JSON Responses

#### Success (201 Created):
```json
{
  "success": true,
  "message": "Student record created successfully",
  "data": {
    "_id": "6720d2a8b9412f1234567890",
    "name": "Darsh Sharma",
    "email": "darsh@university.edu",
    "course": "Computer Science",
    "createdAt": "2026-10-28T16:00:00.000Z",
    "updatedAt": "2026-10-28T16:00:00.000Z"
  }
}
```

#### Error (400 Bad Request):
```json
{
  "success": false,
  "message": "Please provide name, email, and course"
}
```

#### Not Found (404 Not Found):
```json
{
  "success": false,
  "message": "Student not found with id: 6720d2a8b9412f1234567890"
}
```

---

## 8. Postman API Testing & Verified Execution

The collection file `Student_Record_API.postman_collection.json` is included in the project root for testing. All five REST API endpoints have been tested against the live server and verified in Postman:

### 1. GET — All students
> **Retrieve all student records** • `Status: 200 OK` • **Tested**

![GET All Students](screenshots/1-get-all-students.png)

---

### 2. POST — Create student
> **Add a new student to MongoDB** • `Status: 201 Created` • **Tested**

![POST Create Student](screenshots/2-post-create-student.png)

---

### 3. GET by ID — Read one student
> **Retrieve a particular student** • `Status: 200 OK` • **Tested**

![GET Student by ID](screenshots/3-get-student-by-id.png)

---

### 4. PUT — Update student
> **Modify an existing student** • `Status: 200 OK` • **Tested**

![PUT Update Student](screenshots/4-put-update-student.png)

---

### 5. DELETE — Remove student
> **Delete student record by ID** • `Status: 200 OK` • **Tested**

![DELETE Student](screenshots/5-delete-student.png)

---

## 9. Git & GitHub Guide

Follow these commands in your project terminal to save your work and push to GitHub:

### Step 1: Initialize Git Repository
```bash
git init
```

### Step 2: Add Files & Make Initial Commit
```bash
git add .
git commit -m "feat: initial commit - student record management system with MVC and CRUD"
```

### Step 3: Link to GitHub Repository
1. Log in to [GitHub](https://github.com/) and click **New Repository**.
2. Name the repository: `student-record-management`.
3. Set the visibility to **Public**.
4. Do **not** initialize with README, .gitignore, or license (they are already present).
5. Click **Create repository**.
6. Run the following commands in your terminal (replace `<YOUR_GITHUB_USERNAME>` with your actual username):
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/student-record-management.git
   git push -u origin main
   ```

---

## 10. Viva Voce & Code Explanation Guide

When presenting this project to your professor, use this clear guide to explain each concept:

### Core Concepts Explained Simply

- **Node.js:** A JavaScript runtime environment that allows us to run JavaScript on the server (outside the browser). It executes our backend code, handles file operations, and manages HTTP networking.
- **Express.js:** A minimal and flexible web application framework for Node.js. It simplifies routing (matching URLs to code), middleware handling, parsing requests, and sending responses.
- **Route:** A URL path and HTTP method definition (e.g., `POST /students/add` or `GET /api/students`). It tells the server: *"When a request arrives at this URL, pass it to this specific controller function."*
- **Controller:** The brain/business logic of the application. It receives input from the request (`req.body` or `req.params`), talks to the Model (MongoDB), handles validation, and decides whether to render an HTML view or send back JSON.
- **Model:** The data layer representation. Defined using Mongoose, it specifies the schema (rules, fields, and types like `name`, `email`, `course`) for documents stored in MongoDB collections.
- **MongoDB & Mongoose:** MongoDB is a NoSQL, document-oriented database that stores records as BSON/JSON-like documents. Mongoose is an Object Data Modeling (ODM) library for Node.js that provides schema validation, type casting, and convenient methods (`find()`, `create()`, `findByIdAndUpdate()`, `findByIdAndDelete()`).
- **Handlebars:** A templating engine that allows us to generate dynamic HTML on the server. We write HTML with placeholders like `{{name}}` and loops like `{{#each students}}`, and Handlebars injects our database data into the page before sending it to the user's browser.
- **CRUD:** An acronym representing the four basic database operations:
  - **C**reate (`POST`)
  - **R**ead (`GET`)
  - **U**pdate (`PUT` / `POST`)
  - **D**elete (`DELETE` / `POST`)

### How Data Moves (The Complete Request Flow)

1. **User interaction:** The user types a student's name, email, and course into the HTML form and clicks **Add Student**.
2. **Client Validation:** `script.js` intercepts the click, verifies that fields are not empty, checks the email format with a regular expression, and allows the form to submit.
3. **HTTP Request:** The browser sends an HTTP `POST` request to `http://localhost:5000/students/add` with form data in the request body.
4. **Express Middleware:** Express's `express.urlencoded({ extended: true })` middleware parses the incoming form data and attaches it to `req.body`.
5. **Route Matching:** Express matches the URL to `routes/studentRoutes.js`, which directs the request to `addStudentFromForm` in `controllers/studentController.js`.
6. **Controller Logic:** The controller extracts `req.body`, calls `Student.create({ name, email, course })`.
7. **Mongoose & MongoDB:** Mongoose validates the types against `models/Student.js` and sends a command to MongoDB Atlas to insert a new document into the `students` collection.
8. **Response / Redirect:** Once MongoDB confirms the write, the controller issues `res.redirect('/')`.
9. **Page Render:** The browser requests `GET /`, the controller runs `Student.find().lean()`, passes the student records to `index.handlebars`, and Express sends back the updated HTML page.

