const linkRepo = require('../repositories/linkRepository');
const clickRepo = require('../repositories/clickRepository');
const { classifyTraffic, isSuspicious } = require('../utils/ua');
const { buildOgPreview } = require('../utils/html');
const { resolveTarget } = require('../services/redirectService');
const { hashIp } = require('../utils/crypto');
const logger = require('../config/logger');

exports.redirect = async (req, res) => {
  const { slug } = req.params;
  const trafficData = classifyTraffic(req);
  
  if (isSuspicious(req, trafficData)) {
    logger.warn({ ip: req.ip, slug }, 'Suspicious request blocked');
    return res.status(429).send('Too Many Requests');
  }

  const link = await linkRepo.findBySlug(slug);
  
  if (!link) return res.status(404).send('Not Found');
  if (!link.is_active) return res.status(410).send('Gone');

  let redirectStatus = 302;
  let finalTarget = null;

  if (trafficData.trafficClass === 'crawler') {
    res.status(200).send(buildOgPreview(link));
    redirectStatus = 200;
  } else {
    try {
      finalTarget = await resolveTarget(link, trafficData, req.query);
      res.redirect(302, finalTarget);
    } catch (err) {
      logger.error({ err, slug }, 'Redirect resolution failed');
      return res.status(400).send('Invalid Redirect Target');
    }
  }

  // Best effort async log
  clickRepo.logClickAsync({
    link_id: link.id,
    slug_snapshot: slug,
    ip_hash: hashIp(req.ip),
    user_agent: req.headers['user-agent'],
    referer: req.headers['referer'],
    source_param: req.query.src || null,
    device_type: trafficData.deviceType,
    os: trafficData.os,
    is_bot: trafficData.isBot,
    traffic_class: trafficData.trafficClass,
    final_target: finalTarget,
    redirect_status: redirectStatus
  });
};
