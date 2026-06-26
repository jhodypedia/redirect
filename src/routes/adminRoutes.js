const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const asyncHandler = require('../utils/asyncHandler');
const adminAuth = require('../middlewares/adminAuth');

router.use(adminAuth); // Pastikan middleware auth berjalan

// Route untuk merender halaman HTML
router.get('/', asyncHandler(adminController.renderDashboard));

module.exports = router;
