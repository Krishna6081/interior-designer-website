const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { sendSuccess, sendError } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return sendError(res, 'User with this email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: 'user',
      status: 'active'
    });

    const user = await userModel.findById(userId);
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return sendSuccess(
      res,
      'User registered successfully',
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          status: user.status
        }
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password', 401);
    }

    if (user.status !== 'active') {
      return sendError(res, 'Account is inactive. Please contact support.', 403);
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return sendSuccess(
      res,
      'Login successful',
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          status: user.status
        }
      },
      200
    );
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  return sendSuccess(res, 'Logged out successfully');
};

const getProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    return sendSuccess(res, 'User profile fetched', user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile
};
