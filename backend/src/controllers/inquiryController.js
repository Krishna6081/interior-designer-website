const inquiryModel = require('../models/inquiryModel');
const { sendSuccess, sendError } = require('../utils/response');

const createInquiry = async (req, res, next) => {
  try {
    const { name, email, mobile, project_type, location, budget, message } = req.body;

    const inquiryId = await inquiryModel.create({
      name,
      email,
      mobile,
      project_type,
      location,
      budget,
      message,
      status: 'pending'
    });

    const newInquiry = await inquiryModel.findById(inquiryId);
    return sendSuccess(res, 'Inquiry submitted successfully. We will get back to you soon!', newInquiry, 201);
  } catch (error) {
    next(error);
  }
};

const getInquiries = async (req, res, next) => {
  try {
    const statusFilter = req.query.status;
    const inquiries = await inquiryModel.findAll(statusFilter);
    return sendSuccess(res, 'Inquiries fetched successfully', inquiries);
  } catch (error) {
    next(error);
  }
};

const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await inquiryModel.findById(req.params.id);
    if (!inquiry) {
      return sendError(res, 'Inquiry not found', 404);
    }
    return sendSuccess(res, 'Inquiry details fetched', inquiry);
  } catch (error) {
    next(error);
  }
};

const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'contacted', 'completed'].includes(status)) {
      return sendError(res, 'Invalid status value. Must be pending, contacted, or completed', 400);
    }

    const inquiry = await inquiryModel.findById(id);
    if (!inquiry) {
      return sendError(res, 'Inquiry not found', 404);
    }

    await inquiryModel.updateStatus(id, status);
    const updatedInquiry = await inquiryModel.findById(id);

    return sendSuccess(res, 'Inquiry status updated successfully', updatedInquiry);
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await inquiryModel.findById(id);
    if (!inquiry) {
      return sendError(res, 'Inquiry not found', 404);
    }

    await inquiryModel.delete(id);
    return sendSuccess(res, 'Inquiry deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry
};
