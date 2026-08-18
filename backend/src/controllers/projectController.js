const projectModel = require('../models/projectModel');
const { sendSuccess, sendError } = require('../utils/response');

const getProjects = async (req, res, next) => {
  try {
    const category = req.query.category;
    const onlyActive = !req.user || (req.user.role !== 'admin' && req.user.role !== 'Super Admin');
    const projects = await projectModel.findAll({ category, onlyActive });
    return sendSuccess(res, 'Projects fetched successfully', projects);
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) {
      return sendError(res, 'Project not found', 404);
    }
    return sendSuccess(res, 'Project details fetched', project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { title, category, location, description, area, design_style, completion_date, status } = req.body;

    const projectId = await projectModel.create({
      title,
      category,
      location,
      description,
      area,
      design_style,
      completion_date,
      status: status || 'active'
    });

    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = `/uploads/projects/${req.files[i].filename}`;
        await projectModel.addImage(projectId, imageUrl, i + 1);
      }
    } else if (req.body.image_url) {
      await projectModel.addImage(projectId, req.body.image_url, 1);
    }

    const newProject = await projectModel.findById(projectId);
    return sendSuccess(res, 'Project created successfully', newProject, 201);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);
    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    const { title, category, location, description, area, design_style, completion_date, status } = req.body;

    await projectModel.update(id, {
      title,
      category,
      location,
      description,
      area,
      design_style,
      completion_date,
      status
    });

    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = `/uploads/projects/${req.files[i].filename}`;
        await projectModel.addImage(id, imageUrl, i + 1);
      }
    }

    const updatedProject = await projectModel.findById(id);
    return sendSuccess(res, 'Project updated successfully', updatedProject);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);
    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    await projectModel.delete(id);
    return sendSuccess(res, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

const uploadProjectImages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);
    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    if (!req.files || req.files.length === 0) {
      return sendError(res, 'No image files uploaded', 400);
    }

    const uploadedImages = [];
    for (let i = 0; i < req.files.length; i++) {
      const imageUrl = `/uploads/projects/${req.files[i].filename}`;
      const imageId = await projectModel.addImage(id, imageUrl, project.images.length + i + 1);
      uploadedImages.push({ id: imageId, image_url: imageUrl, display_order: project.images.length + i + 1 });
    }

    return sendSuccess(res, 'Project images uploaded successfully', uploadedImages, 201);
  } catch (error) {
    next(error);
  }
};

const deleteProjectImage = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const image = await projectModel.findImageById(imageId);
    if (!image) {
      return sendError(res, 'Image not found', 404);
    }

    await projectModel.deleteImage(imageId);
    return sendSuccess(res, 'Project image deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImages,
  deleteProjectImage
};
