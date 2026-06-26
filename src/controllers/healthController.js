const { getPool } = require('../db/mysql');
const { redisClient } = require('../services/rateLimitService');

exports.check = async (req, res) => {
  let mysqlStatus = 'down';
  try {
    await getPool().query('SELECT 1');
    mysqlStatus = 'up';
  } catch(e) {}

  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mysql: mysqlStatus,
    redis: redisClient.status
  });
};
