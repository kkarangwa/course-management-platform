require('module-alias/register');
const app = require('./app');
const { sequelize } = require('./models');
const { connectRedis } = require('./config/redis');
// require('./workers/notificationWorker'); // Start background workers

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database models
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
    
    // Connect to Redis
    try {
      await connectRedis();
      console.log('Redis connection established successfully.');
    } catch (redisError) {
      console.warn('Redis connection failed, continuing without Redis:', redisError.message);
      // Continue without Redis - your app should still work
    }
    
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