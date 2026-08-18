const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'interior_designer_super_secret_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

module.exports = generateToken;
