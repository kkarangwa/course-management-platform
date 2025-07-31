const { CourseOffering, Course, Module, User } = require('../models');

// Create a course allocation
exports.createCourseOffering = async (req, res) => {
  try {
    const { courseId, moduleId, facilitatorId, startDate, endDate } = req.body;

    const newOffering = await CourseOffering.create({
      courseId,
      moduleId,
      facilitatorId,
      startDate,
      endDate,
    });

    res.status(201).json({
      success: true,
      message: 'Course offering created successfully',
      data: newOffering,
    });
  } catch (error) {
    console.error('Error creating course offering:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all course offerings
exports.getAllCourseOfferings = async (req, res) => {
  try {
    const offerings = await CourseOffering.findAll({
      include: [
        { model: Course, as: 'course' },
        { model: Module },
        { model: User, as: 'facilitator', attributes: ['id', 'name']()