const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../errors/badRequestError");
const NotFound = require("../errors/notfound");
const { CartService } = require("../services");
async function updateCart(req, res, next) {
  try {
    const { productId } = req.body;
    const shouldAddProduct =
      req.body.shouldAddProduct === true || req.body.shouldAddProduct === "true"
        ? true
        : false;
    const { id: cartId } = req.params;
    const userId = req.user.id;

    if (!productId) {
      throw new BadRequest("Product id is required", productId);
    }
    const response = await CartService.updateCart(
      userId,
      cartId,
      productId,
      shouldAddProduct
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: shouldAddProduct
        ? "Product added to cart successfully"
        : "Product removed from cart successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function getCartProduct(req, res, next) {
  try {
    const response = await CartService.getCartProduct(
      req.params.id,
      req.user.id
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Cart product fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function clearCart(req, res, next) {
  try {
    const response = await CartService.clearCart(req.params.id, req.user.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "updated cart successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateCart,
  getCartProduct,
  clearCart,
};
