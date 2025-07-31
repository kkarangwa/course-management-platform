const { ActivityTracker, CourseOffering, Module, User } = require('../models');
const { notificationQueue } = require('../config/redis');

class ActivityTrackerController {
  async create(req, res) {
    try {
      const activity = await ActivityTracker.create({
        ...req.body,
        facilitatorId: req.user.id
      });

      // Queue notification for manager
      await notificationQueue.add('activity-submitted', {
        facilitatorId: req.user.id,
        allocationId: req.body.allocationId,
        weekNumber: req.body.weekNumber
      });

      res.status(201).json({
        success: true,
        data: activity
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFacilitatorLogs(req, res) {
    try {
      const facilitatorId = req.user.role === 'facilitator' ? req.user.id : req.params.facilitatorId;
      
      const logs = await ActivityTracker.findAll({
        where: { facilitatorId },
        include: [{
          model: CourseOffering,
          include: [{ model: Module, attributes: ['code', 'name'] }]
        }],
        order: [['weekNumber', 'DESC']]
      });

      res.json({
        success: true,
        data: logs
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const whereClause = { id };
      
      // Facilitators can only update their own logs
      if (req.user.role === 'facilitator') {
        whereClause.facilitatorId = req.user.id;
      }

      const [updated] = await ActivityTracker.update(req.body, {
        where: whereClause
      });

      if (!updated) {
        return res.status(404).json({ error: 'Activity log not found' });
      }

      const activity = await ActivityTracker.findByPk(id);
      res.json({
        success: true,
        data: activity
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ActivityTrackerController();