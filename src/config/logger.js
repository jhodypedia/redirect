const pino = require('pino');
const env = require('./env');

const logger = pino({
  name: 'pansa-group-redirector',
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
});

module.exports = logger;
