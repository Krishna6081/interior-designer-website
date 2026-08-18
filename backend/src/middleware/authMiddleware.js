const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');
const pool = require('../config/database');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Access denied. No token provided.', 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'interior_designer_super_secret_jwt_key_2026'
    );

    const [rows] = await pool.query(
      'SELECT id, name, email, mobile, role, status FROM users WHERE id = ?',
      [decoded.id]
    );

    if (rows.length === 0) {
      return sendError(res, 'User no longer exists.', 401);
    }

    const user = rows[0];

    if (user.status !== 'active') {
      return sendError(res, 'Account is inactive.', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token.', 401);
  }
};

module.exports = authMiddleware;
