const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas database
 * Reads MONGO_URI from the environment variables.
 * Throws an error if connection fails so the server does not accept requests in an unready state.
 */
const connectDB = async () => {
  const rawUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!rawUri) {
    const errorMsg = 'MONGO_URI is not defined in environment variables. Please check your .env file.';
    console.error(`\n[Database Configuration Error] ${errorMsg}\n`);
    throw new Error(errorMsg);
  }

  // Ensure the database name (studentDB) is included in the URI
  let mongoUri = rawUri.trim();
  if (mongoUri.endsWith('.net') || mongoUri.endsWith('.net/')) {
    mongoUri = mongoUri.replace(/\/?$/, '/studentDB?retryWrites=true&w=majority');
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(` Connected to MongoDB Atlas host: ${conn.connection.host}`);
    console.log(` Active Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('\n================ MongoDB Connection Failure ================');
    console.error(`Reason: ${error.message}`);
    console.error('\nTroubleshooting Checklist:');
    console.error(' 1. In MongoDB Atlas, verify your current public IP is added to Network Access.');
    console.error(' 2. Verify database username and password in .env (special chars must be URL-encoded).');
    console.error(' 3. Check your internet connection or firewall/VPN settings.');
    console.error('============================================================\n');
    throw error;
  }
};

module.exports = connectDB;
