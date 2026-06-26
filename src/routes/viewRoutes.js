const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminAuth = require('../middlewares/adminAuth');
const { query } = require('../db/mysql');

// Auth Pages
router.get('/login', (req, res) => res.render('login', { error: null }));
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Protected Dashboard Pages
router.get('/dashboard', adminAuth, async (req, res) => {
  // Ambil summary singkat untuk dashboard
  const links = await query('SELECT COUNT(*) as total FROM links WHERE is_active = 1');
  const clicks = await query('SELECT COUNT(*) as total FROM clicks');
  const recentLinks = await query('SELECT title, slug, primary_target_url, is_active FROM links ORDER BY created_at DESC LIMIT 5');
  
  res.render('dashboard', {
    stats: {
      activeLinks: links[0].total,
      totalClicks: clicks[0].total,
    },
    recentLinks
  });
});

module.exports = router;
