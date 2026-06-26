const mysql = require('mysql2/promise');
const env = require('../config/env');
const logger = require('../config/logger');
const schema = require('./schema');
const { runSeeds } = require('./seeds');
const { getPool } = require('./mysql');

const initDatabase = async () => {
  let connection;
  try {
    logger.info('Connecting to MySQL server...');
    connection = await mysql.createConnection({
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT, 10),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    logger.info(`Database ${env.DB_NAME} ensured.`);
    await connection.end();

    const pool = getPool();
    for (const ddl of schema) {
      await pool.query(ddl);
    }
    logger.info('All tables ensured.');

    await runSeeds();
  } catch (error) {
    logger.error({ err: error }, 'Database initialization failed');
    process.exit(1);
  }
};

module.exports = initDatabase;
