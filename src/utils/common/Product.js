const { CartProduct } = require("../../models");
async function addProductToCart(cartId, productId) {
  const result = await CartProduct.findOne({
    where: {
      cartId: cartId,
      productId: productId,
    },
  });

  if (!result) {
    // If the product is not in the cart, create it with quantity 1
    await CartProduct.create({
      cartId,
      productId,
      quantity: 1,
    });
  } else {
    // If the product is already in the cart, increment the quantity
    await result.increment({ quantity: 1 });
  }
}

async function removeProductFromCart(cartId, productId) {
  const result = await CartProduct.findOne({
    where: {
      cartId: cartId,
      productId: productId,
    },
  });

  if (!result) {
    throw new NotFound("result is not found", productId);
  }

  if (result.quantity === 1) {
    // If the quantity is 1, remove the product from the cart
    await CartProduct.destroy({
      where: {
        cartId: cartId,
        productId: productId,
      },
    });
  } else {
    // If the quantity is greater than 1, decrement the quantity
    await result.decrement({ quantity: 1 });
  }
}
module.exports = {
  addProductToCart,
  removeProductFromCart,
};
