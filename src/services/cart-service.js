const { StatusCodes } = require("http-status-codes");
const { CartRepository } = require("../repositories");
const NotFound = require("../errors/notfound");
const BadRequest = require("../errors/badRequestError");
const UnauthorizedRequest = require("../errors/unauthorizedError");

const cartRepository = new CartRepository();

async function updateCart(cartId, productId, shouldAddProduct = true) {
  try {
    const response = await cartRepository.updateCart(
      cartId,
      productId,
      shouldAddProduct
    );
    if (!response) {
      throw new NotFound("Cart update failed", { cartId, productId });
    }
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cart not found", response);
    }
    throw error;
  }
}
async function getCartProduct(cartId, userId) {
  try {
    const response = await cartRepository.getCartProduct(cartId, userId);
    if (!response) {
      throw new NotFound("Cart product not found", cartId);
    }
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cart not found", response);
    }
    throw error;
  }
}
async function clearCart(cartId, userId) {
  try {
    const response = await cartRepository.clearCart(cartId, userId);
    if (!response) {
      throw new NotFound("Cart not found", cartId);
    }
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFound("Cart not found", response);
    }
    throw error;
  }
}

module.exports = {
  updateCart,
  getCartProduct,
  clearCart,
};
