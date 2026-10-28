const mongoose = require('mongoose');

/**
 * Student Schema
 * Defines the structure and validation rules for student documents in MongoDB.
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long']
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ]
    },
    course: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true
    }
  },
  {
    // Automatically creates `createdAt` and `updatedAt` timestamps
    timestamps: true
  }
);

// Compile into a Mongoose Model (creates the 'students' collection in MongoDB)
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
