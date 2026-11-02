const mongoose = require('mongoose');
const Student = require('../models/Student');

// =============================================================================
// STUDENT REST API CONTROLLERS
// Handles CRUD operations and returns standard JSON responses with HTTP status codes
// =============================================================================

/**
 * @desc    Retrieve all students from MongoDB
 * @route   GET /api/students
 * @access  Public
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
 * @desc    Retrieve a single student by MongoDB ObjectId
 * @route   GET /api/students/:id
 * @access  Public
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
 * @desc    Create a new student record
 * @route   POST /api/students
 * @access  Public
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
 * @desc    Update an existing student record by ID
 * @route   PUT /api/students/:id
 * @access  Public
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
 * @desc    Delete a student record by ID
 * @route   DELETE /api/students/:id
 * @access  Public
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
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
