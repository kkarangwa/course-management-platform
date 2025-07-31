// ActivityTracker.js/controllers/courseOfferingController.js
const { CourseOffering } = require('../../models');

// Get all course offerings
exports.getAllCourseOfferings = async (req, res) => {
  try {
    const offerings = await CourseOffering.findAll();
    res.status(200).json(offerings);
  } catch (error) {
    console.error('Error fetching course offerings:', error);
    res.status(500).json({ message: 'Server error while fetching course offerings' });
  }
};

// Create a new course offering
exports.createCourseOffering = async (req, res) => {
  try {
    const { courseName, instructor, semester, schedule } = req.body;

    // Basic validation (you can expand this later)
    if (!courseName || !instructor || !semester || !schedule) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newOffering = await CourseOffering.create({
      courseName,
      instructor,
      semester,
      schedule,
    });

    res.status(201).json(newOffering);
  } catch (error) {
    console.error('Error creating course offering:', error);
    res.status(500).json({ message: 'Server error while creating course offering' });
  }
};