const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const asyncHandler = require('../utils/asyncHandler');
const adminAuth = require('../middlewares/adminAuth');

router.use(adminAuth);
router.get('/links', asyncHandler(adminController.getLinks));
router.get('/links/:id', asyncHandler(adminController.getLink));
router.get('/links/:id/stats', asyncHandler(adminController.getStats));

module.exports = router;
