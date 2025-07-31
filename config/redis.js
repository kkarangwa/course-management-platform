const Redis = require('redis');
const Bull = require('bull');

const redisClient = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

// Create notification queue
const notificationQueue = new Bull('notification queue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

module.exports = {
  redisClient,
  notificationQueue
};