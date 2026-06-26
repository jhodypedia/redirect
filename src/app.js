const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const requestId = require('./middlewares/requestId');
const errorHandler = require('./middlewares/errorHandler');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const healthRoutes = require('./routes/healthRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false })); // Matikan CSP sementara agar Tailwind CDN jalan
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk parsing form POST
app.use(cookieParser());
app.use(requestId);

// Routes
app.use('/', viewRoutes); // Route halaman admin (EJS)
app.use('/', publicRoutes); // Route redirector (/p/:slug)
app.use('/api', adminRoutes);
app.use('/health', healthRoutes);

app.use((req, res) => res.status(404).json({ error: 'Endpoint Not Found' }));
app.use(errorHandler);

module.exports = app;
