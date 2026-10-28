const mongoose = require('mongoose');

/**
 * Student Schema
 * A Mongoose schema defines the structure of documents within a MongoDB collection.
 * It enforces data types, requirements, and validation rules.
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
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
    // Automatically creates `createdAt` and `updatedAt` timestamps for each record
    timestamps: true
  }
);

// Compile the schema into a Mongoose Model
// MongoDB will automatically create a collection named 'students' (lowercase plural)
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

