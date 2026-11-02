const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

// Initialize Express app
const app = express();

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================
// Parse incoming JSON payloads (application/json)
app.use(express.json());

// Parse incoming urlencoded payloads (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// =============================================================================
// ROOT & HEALTH CHECK ROUTE
// =============================================================================
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Record Management REST API is running',
    version: '1.0.0',
    endpoints: {
      getAllStudents: 'GET /api/students',
      createStudent: 'POST /api/students',
      getStudentById: 'GET /api/students/:id',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id'
    }
  });
});

// =============================================================================
// REST API ROUTES
// =============================================================================
app.use('/api/students', studentRoutes);

// =============================================================================
// 404 HANDLER FOR UNDEFINED ROUTES
// =============================================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`
  });
});

// =============================================================================
// CENTRALIZED ERROR HANDLING MIDDLEWARE
// =============================================================================
app.use((err, req, res, next) => {
  console.error(`[Unhandled Server Error] ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

module.exports = app;
