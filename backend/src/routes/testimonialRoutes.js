const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { uploadTestimonial } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', testimonialController.getTestimonials);
router.get('/:id', testimonialController.getTestimonialById);

// Submit testimonial (public or logged-in)
router.post(
  '/',
  uploadTestimonial.single('customer_image'),
  testimonialController.createTestimonial
);

// Admin-only management routes
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  uploadTestimonial.single('customer_image'),
  testimonialController.updateTestimonial
);

router.delete('/:id', authMiddleware, adminMiddleware, testimonialController.deleteTestimonial);

module.exports = router;
