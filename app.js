const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Initialize Express application
const app = express();

// =============================================================================
// GLOBAL MIDDLEWARE
// =============================================================================
// Parse incoming JSON request bodies (application/json)
app.use(express.json());

// Parse incoming URL-encoded request bodies (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// =============================================================================
// ROOT HEALTH CHECK ROUTE
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
// API RESOURCE ROUTES
// =============================================================================
app.use('/api/students', studentRoutes);

// =============================================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================================
app.use(notFound);
app.use(errorHandler);

module.exports = app;
