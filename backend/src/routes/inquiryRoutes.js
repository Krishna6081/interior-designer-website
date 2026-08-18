const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { validateInquiry } = require('../validators/inquiryValidator');

// Public route for submitting inquiries
router.post('/', validateInquiry, inquiryController.createInquiry);

// Admin-only routes for viewing and managing inquiries
router.get('/', authMiddleware, adminMiddleware, inquiryController.getInquiries);
router.get('/:id', authMiddleware, adminMiddleware, inquiryController.getInquiryById);
router.put('/:id', authMiddleware, adminMiddleware, inquiryController.updateInquiryStatus);
router.delete('/:id', authMiddleware, adminMiddleware, inquiryController.deleteInquiry);

module.exports = router;
