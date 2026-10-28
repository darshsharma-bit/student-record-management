// Load environment variables from .env file
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

// Define server port
const PORT = process.env.PORT || 5000;

/**
 * Start the application:
 * 1. Connect to MongoDB Atlas first
 * 2. Start the Express HTTP listener only after database connection succeeds
 */
const startServer = async () => {
  try {
    // Ensure DB connection is established before accepting incoming requests
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log('====================================================');
      console.log(` Student Record Management Server is Running!`);
      console.log(` Web UI:  http://localhost:${PORT}`);
      console.log(` API URL: http://localhost:${PORT}/api/students`);
      console.log(` Mode:    ${process.env.NODE_ENV || 'development'}`);
      console.log('====================================================');
    });

    // Graceful shutdown handling
    const shutdown = () => {
      console.log('\nShutting down server gracefully...');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error(`Could not start server due to database failure: ${error.message}`);
    process.exit(1);
  }
};

startServer();
