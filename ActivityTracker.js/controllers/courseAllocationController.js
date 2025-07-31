const { CourseOffering, Module, User, Cohort } = require('../models');
const { validationResult } = require('express-validator');

class CourseAllocationController {
  // Create new course allocation
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const allocation = await CourseOffering.create(req.body);
      res.status(201).json({
        success: true,
        data: allocation
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all allocations with filters
  async getAll(req, res) {
    try {
      const { trimester, cohort, intake, facilitator, mode } = req.query;
      const where = {};

      if (trimester) where.trimester = trimester;
      if (cohort) where.cohortId = cohort;
      if (intake) where.intake = intake;
      if (facilitator) where.facilitatorId = facilitator;
      if (mode) where.mode = mode;

      const allocations = await CourseOffering.findAll({
        where,
        include: [
          { model: Module, attributes: ['code', 'name'] },
          { model: User, as: 'facilitator', attributes: ['firstName', 'lastName', 'email'] },
          { model: Cohort, attributes: ['name', 'year'] }
        ]
      });

      res.json({
        success: true,
        data: allocations
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get facilitator's assigned courses
  async getFacilitatorCourses(req, res) {
    try {
      const facilitatorId = req.user.role === 'facilitator' ? req.user.id : req.params.facilitatorId;
      
      const courses = await CourseOffering.findAll({
        where: { facilitatorId },
        include: [
          { model: Module, attributes: ['code', 'name', 'credits'] },
          { model: Cohort, attributes: ['name', 'year'] }
        ]
      });

      res.json({
        success: true,
        data: courses
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update allocation
  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await CourseOffering.update(req.body, {
        where: { id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Allocation not found' });
      }

      const allocation = await CourseOffering.findByPk(id, {
        include: [
          { model: Module, attributes: ['code', 'name'] },
          { model: User, as: 'facilitator', attributes: ['firstName', 'lastName'] }
        ]
      });

      res.json({
        success: true,
        data: allocation
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete allocation
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await CourseOffering.destroy({
        where: { id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Allocation not found' });
      }

      res.json({
        success: true,
        message: 'Allocation deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CourseAllocationController();