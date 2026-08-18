const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { uploadService } = require('../middleware/uploadMiddleware');
const { validateService } = require('../validators/serviceValidator');

// Public routes
router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);

// Admin-only routes
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  uploadService.single('image'),
  validateService,
  serviceController.createService
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  uploadService.single('image'),
  validateService,
  serviceController.updateService
);

router.delete('/:id', authMiddleware, adminMiddleware, serviceController.deleteService);

module.exports = router;
