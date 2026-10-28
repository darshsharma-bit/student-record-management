// Load environment variables from .env file
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB Atlas
connectDB();

// Define server port
const PORT = process.env.PORT || 5000;

// Start the Express HTTP server
const server = app.listen(PORT, () => {
  console.log('====================================================');
  console.log(` Student Record Management Server is Running!`);
  console.log(` Web UI:  http://localhost:${PORT}`);
  console.log(` API URL: http://localhost:${PORT}/api/students`);
  console.log(` Mode:    ${process.env.NODE_ENV || 'development'}`);
  console.log('====================================================');
});

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

