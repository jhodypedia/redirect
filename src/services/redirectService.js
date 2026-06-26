const { appendParams, validateTargetUrl } = require('../utils/url');
const domainRepo = require('../repositories/domainRepository');

exports.resolveTarget = async (link, trafficData, queryParams) => {
  let target = link.primary_target_url;

  if (trafficData.deviceType === 'mobile' && link.deep_link_url) {
    target = link.deep_link_url;
  } else if (!target && link.fallback_url) {
    target = link.fallback_url;
  }

  const allowedDomains = await domainRepo.getAllowedHostnames();
  if (!validateTargetUrl(target, allowedDomains)) {
    throw new Error('Target domain is not whitelisted.');
  }

  const trackingParams = {
    src: queryParams.src,
    sub1: queryParams.sub1,
    sub2: queryParams.sub2,
    utm_source: queryParams.utm_source,
    utm_medium: queryParams.utm_medium,
    utm_campaign: queryParams.utm_campaign,
  };

  return appendParams(target, trackingParams);
};
