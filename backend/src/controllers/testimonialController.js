const testimonialModel = require('../models/testimonialModel');
const { sendSuccess, sendError } = require('../utils/response');

const getTestimonials = async (req, res, next) => {
  try {
    const onlyApproved = !req.user || (req.user.role !== 'admin' && req.user.role !== 'Super Admin');
    const testimonials = await testimonialModel.findAll(onlyApproved);
    return sendSuccess(res, 'Testimonials fetched successfully', testimonials);
  } catch (error) {
    next(error);
  }
};

const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await testimonialModel.findById(req.params.id);
    if (!testimonial) {
      return sendError(res, 'Testimonial not found', 404);
    }
    return sendSuccess(res, 'Testimonial details fetched', testimonial);
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const { customer_name, rating, review, status } = req.body;
    let customer_image = req.body.customer_image;

    if (req.file) {
      customer_image = `/uploads/testimonials/${req.file.filename}`;
    }

    const defaultStatus = (req.user && (req.user.role === 'admin' || req.user.role === 'Super Admin')) ? (status || 'approved') : 'pending';

    const id = await testimonialModel.create({
      customer_name,
      customer_image,
      rating: rating ? parseInt(rating, 10) : 5,
      review,
      status: defaultStatus
    });

    const newTestimonial = await testimonialModel.findById(id);
    return sendSuccess(res, 'Testimonial created successfully', newTestimonial, 201);
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await testimonialModel.findById(id);
    if (!testimonial) {
      return sendError(res, 'Testimonial not found', 404);
    }

    const { customer_name, rating, review, status } = req.body;
    let customer_image = req.body.customer_image || testimonial.customer_image;

    if (req.file) {
      customer_image = `/uploads/testimonials/${req.file.filename}`;
    }

    await testimonialModel.update(id, {
      customer_name,
      customer_image,
      rating: rating ? parseInt(rating, 10) : testimonial.rating,
      review,
      status
    });

    const updatedTestimonial = await testimonialModel.findById(id);
    return sendSuccess(res, 'Testimonial updated successfully', updatedTestimonial);
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await testimonialModel.findById(id);
    if (!testimonial) {
      return sendError(res, 'Testimonial not found', 404);
    }

    await testimonialModel.delete(id);
    return sendSuccess(res, 'Testimonial deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
