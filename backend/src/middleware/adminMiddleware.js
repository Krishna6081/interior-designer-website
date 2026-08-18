const { sendError } = require('../utils/response');

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return sendError(res, 'Authentication required.', 401);
  }

  const role = (req.user.role || '').toLowerCase();
  
  if (role === 'admin' || role === 'super admin') {
    return next();
  }

  return sendError(res, 'Access denied. Admin rights required.', 403);
};

module.exports = adminMiddleware;
