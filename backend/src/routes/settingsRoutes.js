const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public route
router.get('/', settingsController.getSettings);

// Admin-only update route
router.put('/', authMiddleware, adminMiddleware, settingsController.updateSettings);

module.exports = router;
