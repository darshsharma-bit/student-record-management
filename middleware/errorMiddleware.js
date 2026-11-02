/**
 * Centralized Error Handling Middleware
 * Manages 404 undefined routes and global server exceptions
 */

/**
 * Catch-all handler for undefined API routes (404)
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`
  });
};

/**
 * Global error handler for unhandled exceptions (500 or custom status)
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[Server Error] ${err.message}`);

  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = {
  notFound,
  errorHandler
};

