// routes/courseOfferingRoutes.js
const express = require('express');
const router = express.Router();
const courseOfferingController = require('../controllers/courseOfferingController');

// Route to get all course offerings
router.get('/', courseOfferingController.getAllCourseOfferings);

// Route to create a new course offering
router.post('/', courseOfferingController.createCourseOffering);

module.exports = router;