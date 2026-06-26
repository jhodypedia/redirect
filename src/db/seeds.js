const { execute, query } = require('./mysql');
const logger = require('../config/logger');
const bcrypt = require('bcrypt');

const runSeeds = async () => {
  const links = await query('SELECT COUNT(*) as count FROM links');
  if (links[0].count > 0) return;

  logger.info('Inserting seed data for Pansa Group...');

  await execute(`
    INSERT INTO allowed_domains (hostname) VALUES 
    ('shopee.co.id'), 
    ('affiliate.shopee.co.id')
  `);

  await execute(`
    INSERT INTO links (slug, product_name, title, description, primary_target_url) VALUES 
    ('shopee-promo', 'Promo Pansa', 'PansaGroup Promo Shopee', 'Dapatkan diskon spesial.', 'https://shopee.co.id'),
    ('shopee-aff', 'Affiliate', 'Shopee Affiliate', 'Join program affiliate kami.', 'https://affiliate.shopee.co.id')
  `);

  await execute(`
    INSERT INTO rules (link_id, priority, condition_json, target_url) VALUES 
    (1, 100, '{"device": "mobile"}', 'https://shopee.co.id/mobile-promo')
  `);

  COUNT(*) as count FROM 'admins');
if (admins[0].count === 0) {
  const hash = await bcrypt.hash('admin123', 10);
  await execute('INSERT INTO admins (username, password_hash) VALUES (?, ?)', ['admin', hash]);
  logger.info('Default admin created (admin / admin123)');
}



  logger.info('Seed data inserted successfully.');
};

module.exports = { runSeeds };
