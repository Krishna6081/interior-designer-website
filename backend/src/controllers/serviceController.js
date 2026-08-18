const serviceModel = require('../models/serviceModel');
const { sendSuccess, sendError } = require('../utils/response');

const getServices = async (req, res, next) => {
  try {
    const onlyActive = !req.user || (req.user.role !== 'admin' && req.user.role !== 'Super Admin');
    const services = await serviceModel.findAll(onlyActive);
    return sendSuccess(res, 'Services fetched successfully', services);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const service = await serviceModel.findById(req.params.id);
    if (!service) {
      return sendError(res, 'Service not found', 404);
    }
    return sendSuccess(res, 'Service details fetched', service);
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/services/${req.file.filename}`;
    }

    const serviceId = await serviceModel.create({
      title,
      description,
      image,
      status: status || 'active'
    });

    const newService = await serviceModel.findById(serviceId);
    return sendSuccess(res, 'Service created successfully', newService, 201);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.findById(id);
    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    const { title, description, status } = req.body;
    let image = req.body.image || service.image;

    if (req.file) {
      image = `/uploads/services/${req.file.filename}`;
    }

    await serviceModel.update(id, { title, description, image, status });
    const updatedService = await serviceModel.findById(id);

    return sendSuccess(res, 'Service updated successfully', updatedService);
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.findById(id);
    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    await serviceModel.delete(id);
    return sendSuccess(res, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
