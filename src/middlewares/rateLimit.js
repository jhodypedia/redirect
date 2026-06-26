const { checkRateLimit } = require('../services/rateLimitService');
const { hashIp } = require('../utils/crypto');
const env = require('../config/env');

module.exports = async (req, res, next) => {
  const ipHash = hashIp(req.ip || 'unknown');
  const key = `ratelimit:${ipHash}`;
  
  const allowed = await checkRateLimit(key, parseInt(env.RATE_LIMIT_MAX_REQUESTS), parseInt(env.RATE_LIMIT_WINDOW_MS));
  if (!allowed) {
    return res.status(429).json({ error: 'Too Many Requests' });
  }
  next();
};
