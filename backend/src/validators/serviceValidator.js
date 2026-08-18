const { z } = require('zod');

const serviceSchema = z.object({
  title: z.string().min(3, 'Service title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional()
});

const validateService = (req, res, next) => {
  try {
    serviceSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateService
};
