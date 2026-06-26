const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const requestId = require('./middlewares/requestId');
const errorHandler = require('./middlewares/errorHandler');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestId);

app.use('/', publicRoutes);
app.use('/api', adminRoutes);
app.use('/health', healthRoutes);

app.use((req, res) => res.status(404).json({ error: 'Endpoint Not Found' }));
app.use(errorHandler);

module.exports = app;
