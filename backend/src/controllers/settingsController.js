const settingsModel = require('../models/settingsModel');
const { sendSuccess } = require('../utils/response');

const getSettings = async (req, res, next) => {
  try {
    const settings = await settingsModel.getSettings();
    return sendSuccess(res, 'Website settings fetched successfully', settings || {});
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logo = `/uploads/settings/${req.file.filename}`;
    }

    await settingsModel.updateSettings(data);
    const updatedSettings = await settingsModel.getSettings();

    return sendSuccess(res, 'Website settings updated successfully', updatedSettings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings
};
