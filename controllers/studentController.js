const mongoose = require('mongoose');
const Student = require('../models/Student');

// =============================================================================
// WEB PAGE (HANDLEBARS) CONTROLLERS
// Handlers for browser requests that render HTML views.
// =============================================================================

/**
 * @desc    Render main page displaying all students and the entry form
 * @route   GET /
 */
const renderStudentList = async (req, res) => {
  try {
    // .lean() converts Mongoose documents into plain JavaScript objects for Handlebars
    const students = await Student.find().sort({ createdAt: -1 }).lean();

    res.render('students/index', {
      students,
      errorMessage: req.query.error,
      successMessage: req.query.success
    });
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
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const course = req.body.course?.trim();

    // Required fields validation
    if (!name || !email || !course) {
      return res.redirect('/?error=All+fields+are+required');
    }

    await Student.create({ name, email, course });
    res.redirect('/?success=Student+added+successfully');
  } catch (error) {
    console.error('Error adding student from form:', error.message);

    // Handle duplicate email error (MongoDB error code 11000)
    if (error.code === 11000) {
      return res.redirect('/?error=A+student+with+this+email+address+already+exists');
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.redirect(`/?error=${encodeURIComponent(messages.join(', '))}`);
    }

    res.redirect('/?error=Failed+to+add+student+record');
  }
};

/**
 * @desc    Update an existing student submitted via the web form
 * @route   POST /students/edit/:id
 */
const updateStudentFromForm = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const course = req.body.course?.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect('/?error=Invalid+student+ID');
    }

    if (!name || !email || !course) {
      return res.redirect('/?error=All+fields+are+required');
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.redirect('/?error=Student+not+found');
    }

    await Student.findByIdAndUpdate(
      id,
      { name, email, course },
      { returnDocument: 'after', runValidators: true }
    );

    res.redirect('/?success=Student+updated+successfully');
  } catch (error) {
    console.error('Error updating student from form:', error.message);

    if (error.code === 11000) {
      return res.redirect('/?error=A+student+with+this+email+address+already+exists');
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.redirect(`/?error=${encodeURIComponent(messages.join(', '))}`);
    }

    res.redirect('/?error=Failed+to+update+student+record');
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

    const student = await Student.findById(id);
    if (!student) {
      return res.redirect('/?error=Student+not+found');
    }

    await Student.findByIdAndDelete(id);
    res.redirect('/?success=Student+deleted+successfully');
  } catch (error) {
    console.error('Error deleting student from form:', error.message);
    res.redirect('/?error=Failed+to+delete+student+record');
  }
};

// =============================================================================
// REST API (POSTMAN / JSON) CONTROLLERS
// Return JSON responses with standard HTTP status codes.
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
    console.error('API Error (getAllStudents):', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching student records'
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

    // Validate MongoDB ObjectId format
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
    console.error(`API Error (getStudentById ${req.params.id}):`, error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving student record'
    });
  }
};

/**
 * @desc    Create a new student
 * @route   POST /api/students
 */
const createStudent = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const course = req.body.course?.trim();

    // Required fields validation
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
    console.error('API Error (createStudent):', error.message);

    // Handle duplicate email (E11000)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email address already exists'
      });
    }

    // Handle Mongoose schema validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating student record'
    });
  }
};

/**
 * @desc    Update an existing student's details
 * @route   PUT /api/students/:id
 */
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const course = req.body.course?.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }

    if (!name || !email || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and course'
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, course },
      { returnDocument: 'after', runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Student record updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    console.error(`API Error (updateStudent ${req.params.id}):`, error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email address already exists'
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating student record'
    });
  }
};

/**
 * @desc    Delete a student by ID
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
    console.error(`API Error (deleteStudent ${req.params.id}):`, error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting student record'
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
