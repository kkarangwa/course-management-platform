// controllers/courseController.js
'use strict';

const { Course, Cohort, Module } = require('../models');

module.exports = {
  // Get all courses
  async getAllCourses(req, res) {
    try {
      const courses = await Course.findAll({
        include: [
          { model: Module },
          { model: Cohort }
        ]
      });
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Failed to retrieve courses' });
    }
  },

  // Get a single course by ID
  async getCourseById(req, res) {
    try {
      const course = await Course.findByPk(req.params.id, {
        include: [
          { model: Module },
          { model: Cohort }
        ]
      });

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json(course);
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ message: 'Failed to retrieve course' });
    }
  },

  // Create a new course
  async createCourse(req, res) {
    try {
      const { name } = req.body;

      const course = await Course.create({ name });

      res.status(201).json(course);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Failed to create course' });
    }
  },

  // Update a course
  async updateCourse(req, res) {
    try {
      const { name } = req.body;
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      course.name = name || course.name;
      await course.save();

      res.status(200).json(course);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ message: 'Failed to update course' });
    }
  },

  // Delete a course
  async deleteCourse(req, res) {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      await course.destroy();
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ message: 'Failed to delete course' });
    }
  }
};