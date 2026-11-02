const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

/**
 * Student REST API Routes
 * Base URL mounted at: /api/students
 */

// Route: /api/students (GET all students, POST create student)
router.route('/')
  .get(getAllStudents)
  .post(createStudent);

// Route: /api/students/:id (GET single student, PUT update, DELETE remove)
router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
