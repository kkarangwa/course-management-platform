require('module-alias/register');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const courseOfferingRoutes = require('./routes/courseOfferingRoutes');

// Middleware
app.use(express.json()); // replaces bodyParser

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/course-offerings', courseOfferingRoutes);

// Export the app (don't start the server here)
module.exports = app;