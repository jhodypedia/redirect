const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const requestId = require('./middlewares/requestId');
const errorHandler = require('./middlewares/errorHandler');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Konfigurasi EJS View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sajikan file statis (CSS, JS, Images) jika ada
app.use(express.static(path.join(__dirname, 'public')));

// Security middleware (sesuaikan Content-Security-Policy untuk Tailwind CDN)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk handle form submit
app.use(requestId);

// Routes
app.use('/', publicRoutes);
app.use('/admin', adminRoutes); // Ubah dari /api menjadi /admin untuk halaman web
app.use('/health', healthRoutes);

app.use((req, res) => res.status(404).send('Halaman tidak ditemukan'));
app.use(errorHandler);

module.exports = app;
