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
async function getOrder(req, res, next) {
  try {
    const { id } = req.params;
    console.log("Fetching order with ID:", id);
    const response = await OrderService.fetchOrderDetails(req.user.id, id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Created order successfully",
      data: response,
    });
  } catch (error) {
    // console.log(e?rror);
    next(error);
  }
}

module.exports = {
  createOrder,
  getOrder,
};
