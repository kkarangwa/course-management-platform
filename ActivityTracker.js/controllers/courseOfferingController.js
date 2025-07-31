// controllers/courseOfferingController.js
const { CourseOffering } = require('../models');

// GET all course offerings
exports.getAllCourseOfferings = async (req, res) => {
  try {
    const offerings = await CourseOffering.findAll();
    res.status(200).json(offerings);
  } catch (error) {
    console.error('Error fetching course offerings:', error);
    res.status(500).json({ error: 'Failed to retrieve course offerings' });
  }
};

// CREATE a new course offering
exports.createCourseOffering = async (req, res) => {
  try {
    const newOffering = await CourseOffering.create(req.body);
    res.status(201).json(newOffering);
  } catch (error) {
    console.error('Error creating course offering:', error);
    res.status(400).json({ error: 'Failed to create course offering' });
  }
};