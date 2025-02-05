const BadRequest = require("../errors/badRequestError");
const NotFound = require("../errors/notfound");
const UnauthorizedRequest = require("../errors/unauthorizedError");
const { OrderRepository, CartRepository } = require("../repositories");
const orderRepository = new OrderRepository();
const cartRepository = new CartRepository();
async function createOrder(userId) {
  try {
    console.log("Logged-in User ID:", userId);
    // check if there is a cart for the user or not
    const cart = await cartRepository.getCartByUserId(userId);
    console.log("Cart Belongs to User ID:", cart.userId);
    // console.log("cart", cart);
    if (!cart) {
      throw new BadRequest("Cart not found");
    }
    if (cart.userId !== userId) {
      throw new BadRequest(
        `You do not have permission to modify this cart. Cart belongs to user ID ${cart.userId}.`
      );
    }
    const cartProducts = await cart.getProducts();
    console.log("Cart Products:", cartProducts);
    // console.log(cartProducts);
    if (cartProducts.length == 0) {
      throw new BadRequest("Nothing in cart");
    }
    // create a new emoty order
    const order = await orderRepository.createOrder(userId, "pending");

    // for the above order add order products
    console.log("Before mapping cart products...");
    const orderProductsBulk = cartProducts.map((product) => {
      const quantity = product.CartProduct.quantity;

      console.log(`Product ID: ${product.id}, Quantity: ${quantity}`);

      return {
        orderId: order.id,
        productId: product.id,
        quantity: quantity,
      };
    });

    console.log("After mapping cart products...");
    // console.log(orderProductsBulk);
    // console.log(orderProductsBulk);
    const orderProducts = await orderRepository.addOrderProductInBulk(
      orderProductsBulk
    );

    // console.log(orderProducts);
    order.status = "completed";
    await order.save();

    await cartRepository.clearCart(cart.id, userId);
    return {
      orderId: order.id,
      orderProducts,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function fetchOrderDetails(userId, orderId) {
  try {
    if (!orderId) {
      throw new NotFound("Order ID is undefined");
    }
    const orderObject = await orderRepository.getOrder(orderId);
    console.log("order", orderObject);
    if (!orderObject) {
      throw new NotFound("order not found", orderId);
    }
    if (orderObject.userId != userId) {
      throw new UnauthorizedRequest(
        "orderId",
        `You do not have permission to modify this cart. Cart belongs to user ID ${cartExists.userId}.`
      );
    }
    const response = await orderRepository.fetchDetailsOrder(orderId);
    if (!response) {
      throw new NotFound(`Order with ID ${orderId} not found`);
    }
    const order = {
      id: response.id,
      status: response.status,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
    let totalOrder = 0;
    order.Products = response.Products.map((product) => {
      totalOrder += product.price * product.OrderProduct.quantity;
      return {
        name: product.name,
        price: product.price,
        image: product.image,
        id: product.id,
        quantity: product.OrderProduct.quantity,
      };
    });
    order.totalOrder = totalOrder;
    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createOrder,
  fetchOrderDetails,
};
