const { query } = require('../db/mysql');

exports.getAllowedHostnames = async () => {
  const rows = await query('SELECT hostname FROM allowed_domains WHERE is_active = 1');
  return rows.map(r => r.hostname);
};
