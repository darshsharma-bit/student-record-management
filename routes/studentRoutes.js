const express = require('express');
const router = express.Router();
const {
  renderStudentList,
  addStudentFromForm,
  updateStudentFromForm,
  deleteStudentFromForm
} = require('../controllers/studentController');

/**
 * Web Page Routes (serves Handlebars templates and HTML forms)
 */

// Home page: lists all students and shows the student form
router.get('/', renderStudentList);

// Form actions
router.post('/students/add', addStudentFromForm);
router.post('/students/edit/:id', updateStudentFromForm);
router.post('/students/delete/:id', deleteStudentFromForm);

module.exports = router;

