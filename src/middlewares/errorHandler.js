const logger = require('../config/logger');
module.exports = (err, req, res, next) => {
  logger.error({ err, reqId: req.id }, 'Unhandled Error');
  res.status(500).json({ error: 'Internal Server Error', reqId: req.id });
};
