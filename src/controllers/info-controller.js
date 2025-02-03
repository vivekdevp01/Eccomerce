const { StatusCodes } = require("http-status-codes");

const info = (req, res) => {
  try {
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "API is live",
      error: {},
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  info,
};
