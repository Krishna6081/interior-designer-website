const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err);

  // Multer error handling
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return sendError(res, 'File size exceeds maximum allowed limit of 5MB', 400);
    }
    return sendError(res, `File upload error: ${err.message}`, 400);
  }

  // Zod validation error
  if (err.name === 'ZodError') {
    const formattedErrors = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return sendError(res, `Validation Error: ${formattedErrors}`, 400, err.errors);
  }

  // Database Duplicate Entry error (MySQL Code 1062)
  if (err.code === 'ER_DUP_ENTRY') {
    return sendError(res, 'A record with this information already exists', 409);
  }

  // Database Foreign Key Constraint error (MySQL Code 1451/1452)
  if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_NO_REFERENCED_ROW_2') {
    return sendError(res, 'Referenced item constraint violation', 400);
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, statusCode);
};

module.exports = errorHandler;
