const { query, execute } = require('../db/mysql');

exports.findBySlug = async (slug) => {
  const rows = await query('SELECT * FROM links WHERE slug = ? LIMIT 1', [slug]);
  return rows[0];
};

exports.findAll = async () => {
  return await query('SELECT * FROM links ORDER BY created_at DESC');
};

exports.findById = async (id) => {
  const rows = await query('SELECT * FROM links WHERE id = ? LIMIT 1', [id]);
  return rows[0];
};

exports.create = async (data) => {
  const sql = `INSERT INTO links (slug, title, description, og_image_url, primary_target_url, deep_link_url, fallback_url) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const result = await execute(sql, [
    data.slug, data.title, data.description, data.og_image_url, data.primary_target_url, data.deep_link_url, data.fallback_url
  ]);
  return result.insertId;
};

exports.update = async (id, data) => {
  const sql = `UPDATE links SET title = ?, primary_target_url = ?, is_active = ? WHERE id = ?`;
  await execute(sql, [data.title, data.primary_target_url, data.is_active, id]);
};
