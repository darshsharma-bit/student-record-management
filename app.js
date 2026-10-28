const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

// Import route modules
const studentRoutes = require('./routes/studentRoutes');
const studentApiRoutes = require('./routes/studentApiRoutes');

// Initialize Express app
const app = express();

// =============================================================================
// HANDLEBARS TEMPLATE ENGINE SETUP
// =============================================================================
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    // Allow prototype properties access for Mongoose documents in templates
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================
// Parse incoming form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON payloads (application/json for Postman and API calls)
app.use(express.json());

// Serve static assets (CSS stylesheets, client-side JavaScript, images)
app.use(express.static(path.join(__dirname, 'public')));

// =============================================================================
// APPLICATION ROUTES
// =============================================================================
// Web UI routes (serves Handlebars pages)
app.use('/', studentRoutes);

// REST API routes (returns JSON responses for Postman testing)
app.use('/api/students', studentApiRoutes);

// =============================================================================
// 404 HANDLER FOR UNDEFINED ROUTES
// =============================================================================
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: `API route not found: ${req.method} ${req.originalUrl}`
    });
  }
  res.status(404).send('<h1>404 - Page Not Found</h1><p><a href="/">Return to Home</a></p>');
});

module.exports = app;

