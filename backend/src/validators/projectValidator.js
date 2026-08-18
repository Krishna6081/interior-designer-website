const { z } = require('zod');

const projectSchema = z.object({
  title: z.string().min(3, 'Project title must be at least 3 characters'),
  category: z.string().min(2, 'Category is required'),
  location: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  area: z.string().optional(),
  design_style: z.string().optional(),
  completion_date: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional()
});

const validateProject = (req, res, next) => {
  try {
    projectSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProject
};
