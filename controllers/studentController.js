const mongoose = require('mongoose');
const Student = require('../models/Student');

// =============================================================================
// WEB PAGE (HANDLEBARS) CONTROLLERS
// These functions handle requests from the browser and render HTML views.
// =============================================================================

/**
 * @desc    Render the main page displaying all students and the entry form
 * @route   GET /
 */
const renderStudentList = async (req, res) => {
  try {
    // .lean() converts Mongoose documents to plain JavaScript objects for Handlebars
    const students = await Student.find().sort({ createdAt: -1 }).lean();
    res.render('students/index', { students });
  } catch (error) {
    console.error('Error fetching students for page:', error.message);
    res.render('students/index', {
      students: [],
      errorMessage: 'Could not load student records. Please ensure MongoDB is connected.'
    });
  }
};

/**
 * @desc    Add a new student submitted via the web form
 * @route   POST /students/add
 */
const addStudentFromForm = async (req, res) => {
  try {
    const { name, email, course } = req.body;

    // Simple validation
    if (!name || !email || !course) {
      return res.redirect('/?error=All+fields+are+required');
    }

    await Student.create({ name, email, course });
    res.redirect('/');
  } catch (error) {
    console.error('Error adding student from form:', error.message);
    res.redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
};

/**
 * @desc    Update an existing student submitted via the web form
 * @route   POST /students/edit/:id
 */
const updateStudentFromForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect('/?error=Invalid+student+ID');
    }

    await Student.findByIdAndUpdate(
      id,
      { name, email, course },
      { new: true, runValidators: true }
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error updating student from form:', error.message);
    res.redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
};

/**
 * @desc    Delete a student initiated from the web interface
 * @route   POST /students/delete/:id
 */
const deleteStudentFromForm = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect('/?error=Invalid+student+ID');
    }

    await Student.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting student from form:', error.message);
    res.redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
};

// =============================================================================
// REST API (POSTMAN / JSON) CONTROLLERS
// These functions return JSON responses with standard HTTP status codes.
// =============================================================================

/**
 * @desc    Retrieve all students
 * @route   GET /api/students
 */
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching students',
      error: error.message
    });
  }
};

/**
 * @desc    Retrieve a single student by ID
 * @route   GET /api/students/:id
 */
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving student',
      error: error.message
    });
  }
};

/**
 * @desc    Create a new student
 * @route   POST /api/students
 */
const createStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;

    // Basic input validation
    if (!name || !email || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and course'
      });
    }

    const student = await Student.create({ name, email, course });

    res.status(201).json({
      success: true,
      message: 'Student record created successfully',
      data: student
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating student',
      error: error.message
    });
  }
};

/**
 * @desc    Update a student's details
 * @route   PUT /api/students/:id
 */
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`
      });
    }

    // Update with new data and run schema validators
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, course },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Student record updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating student',
      error: error.message
    });
  }
};

/**
 * @desc    Delete a student
 * @route   DELETE /api/students/:id
 */
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`
      });
    }

    await Student.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Student record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting student',
      error: error.message
    });
  }
};

module.exports = {
  // Web Page Controllers
  renderStudentList,
  addStudentFromForm,
  updateStudentFromForm,
  deleteStudentFromForm,

  // REST API Controllers
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};

