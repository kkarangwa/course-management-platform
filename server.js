const app = require('./app');
const { sequelize } = require('./models');
const { redisClient } = require('./config/redis');
const moduleRoutes = require('./routes/moduleRoutes');
app.use('/api/modules', moduleRoutes);
require('./workers/notificationWorker'); // Start background workers

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database models
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    // Test Redis connection
    await redisClient.ping();
    console.log('Redis connection established successfully.');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();