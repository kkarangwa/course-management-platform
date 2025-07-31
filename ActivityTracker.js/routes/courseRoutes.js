// app.js
const express = require('express');
const app = express();

const courseRoutes = require('./routes/courseRoutes'); 

app.use(express.json()); // Middleware to parse JSON
app.use('/api/courses', courseRoutes); // 

module.exports = app;