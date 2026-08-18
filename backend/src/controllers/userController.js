const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { sendSuccess, sendError } = require('../utils/response');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.findAll();
    return sendSuccess(res, 'Users fetched successfully', users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    return sendSuccess(res, 'User fetched successfully', user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, role, status, password } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const updateData = { name, email, mobile, role, status };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await userModel.update(id, updateData);
    const updatedUser = await userModel.findById(id);

    return sendSuccess(res, 'User updated successfully', updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    await userModel.delete(id);
    return sendSuccess(res, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
