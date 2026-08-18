const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { uploadProject } = require('../middleware/uploadMiddleware');
const { validateProject } = require('../validators/projectValidator');

// Public routes
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

// Admin-only image upload/delete routes
router.post(
  '/:id/images',
  authMiddleware,
  adminMiddleware,
  uploadProject.array('images', 10),
  projectController.uploadProjectImages
);

router.delete(
  '/images/:imageId',
  authMiddleware,
  adminMiddleware,
  projectController.deleteProjectImage
);

// Admin-only project CRUD routes
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  uploadProject.array('images', 10),
  validateProject,
  projectController.createProject
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  uploadProject.array('images', 10),
  validateProject,
  projectController.updateProject
);

router.delete('/:id', authMiddleware, adminMiddleware, projectController.deleteProject);

module.exports = router;
