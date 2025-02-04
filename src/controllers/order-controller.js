const { StatusCodes } = require("http-status-codes");
const { OrderService } = require("../services");

async function createOrder(req, res, next) {
  try {
    const order = await OrderService.createOrder(req.user.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Created order successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
};
