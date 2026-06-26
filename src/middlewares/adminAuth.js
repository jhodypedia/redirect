const jwt = require('jsonwebtoken');
const env = require('../config/env');

module.exports = (req, res, next) => {
  const token = req.cookies.admin_token;

  if (!token) {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.clearCookie('admin_token');
    if (req.originalUrl.startsWith('/api')) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.redirect('/login');
  }
};
