const { z } = require('zod');

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().optional(),
  project_type: z.string().optional(),
  location: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters')
});

const validateInquiry = (req, res, next) => {
  try {
    inquirySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateInquiry
};
