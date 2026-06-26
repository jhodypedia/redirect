const crypto = require('crypto');
const env = require('../config/env');

exports.hashIp = (ip) => {
  if (!ip) return null;
  return crypto.createHmac('sha256', env.APP_SALT).update(ip).digest('hex');
};
