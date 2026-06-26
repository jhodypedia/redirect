const mysql = require('mysql2/promise');
const env = require('../config/env');
const logger = require('../config/logger');

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT, 10),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};

const query = async (sql, params) => {
  const [rows] = await getPool().query(sql, params);
  return rows;
};

const execute = async (sql, params) => {
  const [result] = await getPool().execute(sql, params);
  return result;
};

module.exports = { getPool, query, execute };
