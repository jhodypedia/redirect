const { execute, query } = require('./mysql');
const logger = require('../config/logger');

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

  logger.info('Seed data inserted successfully.');
};

module.exports = { runSeeds };
