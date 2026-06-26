const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');
const initDatabase = require('./db/initDatabase');

const startServer = async () => {
  try {
    logger.info('Initializing Pansa Group Redirector Engine...');
    
    await initDatabase();
    
    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
};

startServer();
