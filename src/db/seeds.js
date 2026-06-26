const bcrypt = require('bcrypt');
const { execute, query } = require('./mysql');
const logger = require('../config/logger');

const runSeeds = async () => {
  try {
    // 1. Seed Akun Admin
    const admins = await query('SELECT COUNT(*) as count FROM admins');
    if (admins[0].count === 0) {
      logger.info('Inserting default admin account...');
      const hash = await bcrypt.hash('admin123', 10);
      await execute('INSERT INTO admins (username, password_hash) VALUES (?, ?)', ['admin', hash]);
      logger.info('Default admin created -> Username: admin | Password: admin123');
    }

    // 2. Seed Data Links, Domains, dan Rules
    const links = await query('SELECT COUNT(*) as count FROM links');
    if (links[0].count === 0) {
      logger.info('Inserting seed data for Pansa Group redirector...');

      // Masukkan domain yang diizinkan (Whitelist)
      await execute(`
        INSERT INTO allowed_domains (hostname) VALUES 
        ('shopee.co.id'), 
        ('affiliate.shopee.co.id')
      `);

      // Masukkan contoh link affiliate
      await execute(`
        INSERT INTO links (slug, product_name, title, description, primary_target_url) VALUES 
        ('shopee-promo', 'Promo Pansa', 'PansaGroup Promo Shopee', 'Dapatkan diskon spesial.', 'https://shopee.co.id'),
        ('shopee-aff', 'Affiliate', 'Shopee Affiliate', 'Join program affiliate kami.', 'https://affiliate.shopee.co.id')
      `);

      // Masukkan contoh rule (misal: redirect khusus mobile)
      await execute(`
        INSERT INTO rules (link_id, priority, condition_json, target_url) VALUES 
        (1, 100, '{"device": "mobile"}', 'https://shopee.co.id/mobile-promo')
      `);

      logger.info('Seed data for links, domains, and rules inserted successfully.');
    }
  } catch (error) {
    logger.error({ err: error }, 'Failed to run seeds');
    throw error;
  }
};

module.exports = { runSeeds };
