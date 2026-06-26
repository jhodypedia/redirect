const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const asyncHandler = require('../utils/asyncHandler');
const rateLimit = require('../middlewares/rateLimit');

router.get('/p/:slug', rateLimit, asyncHandler(publicController.redirect));

module.exports = router;
