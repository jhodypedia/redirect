const { nanoid } = require('nanoid');
module.exports = (req, res, next) => {
  req.id = nanoid();
  res.setHeader('X-Request-Id', req.id);
  next();
};
