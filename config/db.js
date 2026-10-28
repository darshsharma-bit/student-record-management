const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas database
 * Reads MONGO_URI from the .env file.
 */
const connectDB = async () => {
  const rawUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!rawUri) {
    console.error('----------------------------------------------------');
    console.error('ERROR: MONGO_URI is not defined in your .env file!');
    console.error('Please create a .env file and add your MongoDB Atlas URI.');
    console.error('----------------------------------------------------');
    return;
  }

  // Ensure the database name (studentDB) is included in the URI
  let mongoUri = rawUri.trim();
  if (mongoUri.endsWith('.net') || mongoUri.endsWith('.net/')) {
    mongoUri = mongoUri.replace(/\/?$/, '/studentDB?retryWrites=true&w=majority');
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(` MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(` Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error('----------------------------------------------------');
    console.error(` MongoDB Connection Error: ${error.message}`);
    console.error('Troubleshooting Tips:');
    console.error('1. Check if Network Access in MongoDB Atlas allows IP 0.0.0.0/0');
    console.error('2. Verify your database username and password');
    console.error('3. Check your internet connection');
    console.error('----------------------------------------------------');
  }
};

module.exports = connectDB;
