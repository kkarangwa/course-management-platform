require('module-alias/register');
const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');
const courseOfferingRoutes = require('./routes/courseOfferingRoutes'); // add this line

// Middleware
app.use(express.json()); // replaces bodyParser

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/course-offerings', courseOfferingRoutes); // add this line

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});