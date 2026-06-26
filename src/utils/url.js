exports.appendParams = (baseUrl, params) => {
  try {
    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(params)) {
      if (value) url.searchParams.append(key, value);
    }
    return url.toString();
  } catch (e) {
    return baseUrl;
  }
};

exports.validateTargetUrl = (target, allowedDomains) => {
  try {
    const url = new URL(target);
    return allowedDomains.includes(url.hostname);
  } catch {
    return false;
  }
};
