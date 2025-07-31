const { createClient } = require('redis');
const Bull = require('bull');

// Create Redis client
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully');
});

// Function to connect Redis (to be called from server.js)
const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    return redisClient;
  } catch (err) {
    console.error('Redis connection failed:', err);
    throw err;
  }
};

// Create Bull queue (uses older redis syntax but still valid)
const notificationQueue = new Bull('notification queue', {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
});

module.exports = {
  redisClient,
  connectRedis,
  notificationQueue,
};