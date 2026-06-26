const UAParser = require('ua-parser-js');

const KNOWN_BOTS = ['facebookexternalhit', 'Twitterbot', 'TelegramBot', 'WhatsApp', 'LinkedInBot', 'Googlebot'];

exports.classifyTraffic = (req) => {
  const uaString = req.headers['user-agent'] || '';
  const parser = new UAParser(uaString);
  const result = parser.getResult();
  
  let isBot = false;
  let trafficClass = 'human';

  if (!uaString || uaString.length < 5) {
    return { trafficClass: 'suspicious', deviceType: 'unknown', os: 'unknown', isBot: true };
  }

  const isKnownBot = KNOWN_BOTS.some(bot => uaString.includes(bot));
  if (isKnownBot || result.browser.name?.toLowerCase().includes('bot')) {
    isBot = true;
    trafficClass = 'crawler';
  }

  return {
    trafficClass,
    deviceType: result.device.type || (result.os.name === 'Android' || result.os.name === 'iOS' ? 'mobile' : 'desktop'),
    os: result.os.name || 'unknown',
    isBot
  };
};

exports.isSuspicious = (req, trafficData) => {
  if (trafficData.trafficClass === 'suspicious') return true;
  if (!req.headers['user-agent']) return true;
  const method = req.method.toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') return true;
  return false;
};
