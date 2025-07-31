const { notificationQueue } = require('../config/redis');
const { User } = require('../models');

// Process notification jobs
notificationQueue.process('activity-submitted', async (job) => {
  const { facilitatorId, allocationId, weekNumber } = job.data;
  
  try {
    const facilitator = await User.findByPk(facilitatorId);
    const managers = await User.findAll({ where: { role: 'manager' } });

    console.log(`Processing notification: Facilitator ${facilitator.email} submitted activity for week ${weekNumber}`);
    
    // Here you would typically send actual notifications
    // For now, we'll just log them
    managers.forEach(manager => {
      console.log(`Notification sent to manager: ${manager.email}`);
    });

    return { success: true };
  } catch (error) {
    console.error('Notification processing failed:', error);
    throw error;
  }
});

// Process reminder notifications
notificationQueue.process('send-reminder', async (job) => {
  const { facilitatorId, weekNumber } = job.data;
  
  try {
    const facilitator = await User.findByPk(facilitatorId);
    console.log(`Sending reminder to ${facilitator.email} for week ${weekNumber}`);
    
    return { success: true };
  } catch (error) {
    console.error('Reminder processing failed:', error);
    throw error;
  }
});

console.log('Notification worker started');