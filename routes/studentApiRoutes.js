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
 * REST API Routes (returns JSON data for Postman and API clients)
 * Base URL mounted at: /api/students
 */

// Retrieve all students & Create a new student
router.route('/')
  .get(getAllStudents)
  .post(createStudent);

// Retrieve, Update, and Delete a student by their MongoDB ID
router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;

