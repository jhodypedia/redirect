const Redis = require('ioredis');
const env = require('../config/env');
const logger = require('../config/logger');

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 1,
  retryStrategy: () => null // fail fast
});

redis.on('error', (err) => logger.warn({ err }, 'Redis connection error (fail open logic applied)'));

exports.checkRateLimit = async (key, limit, windowMs) => {
  if (redis.status !== 'ready') return true; // Fail open
  
  try {
    const current = await redis.incr(key);
    if (current === 1) await redis.pexpire(key, windowMs);
    return current <= limit;
  } catch (err) {
    logger.warn({ err }, 'Redis rate limit error, bypassing');
    return true; // Fail open
  }
};

exports.redisClient = redis;
