const sendSuccess = (res, message = 'Operation successful', data = null, statusCode = 200) => {
  const responsePayload = {
    success: true,
    message
  };

  if (data !== null && data !== undefined) {
    responsePayload.data = data;
  }

  return res.status(statusCode).json(responsePayload);
};

const sendError = (res, message = 'Something went wrong', statusCode = 500, errors = null) => {
  const responsePayload = {
    success: false,
    message
  };

  if (errors) {
    responsePayload.errors = errors;
  }

  return res.status(statusCode).json(responsePayload);
};

module.exports = {
  sendSuccess,
  sendError
};
