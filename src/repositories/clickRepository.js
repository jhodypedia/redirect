const { execute, query } = require('../db/mysql');
const logger = require('../config/logger');

exports.logClickAsync = async (data) => {
  const sql = `INSERT INTO clicks (link_id, slug_snapshot, ip_hash, user_agent, referer, source_param, device_type, os, is_bot, traffic_class, final_target, redirect_status) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  execute(sql, [
    data.link_id, data.slug_snapshot, data.ip_hash, data.user_agent, data.referer, data.source_param,
    data.device_type, data.os, data.is_bot ? 1 : 0, data.traffic_class, data.final_target, data.redirect_status
  ]).catch(err => {
    logger.error({ err, slug: data.slug_snapshot }, 'Best-effort click logging failed');
  });
};

exports.getStatsByLinkId = async (linkId) => {
  const rows = await query('SELECT COUNT(*) as total, SUM(is_bot) as bots FROM clicks WHERE link_id = ?', [linkId]);
  return rows[0];
};
