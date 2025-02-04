const CrudRepository = require("./crud-repository");
const { Op, where } = require("sequelize");
const { Cart, CartProduct, Product } = require("../models");
const NotFound = require("../errors/notfound");
const { productss, Productss } = require("../utils/common");
const BadRequest = require("../errors/badRequestError");
const UnauthorizedRequest = require("../errors/unauthorizedError");
class CartRepository extends CrudRepository {
  constructor() {
    super(Cart);
  }
  async findOrCreateCart(userId) {
    try {
      const [cart, created] = await Cart.findOrCreate({
        where: {
          userId,
        },
        defaults: {
          userId,
        },
      });
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async clearCart(id, userId) {
    try {
      const cartExists = await Cart.findByPk(id);
      if (!cartExists) {
        throw new BadRequest("cartId", `Cart with ID ${cartId} not found.`);
      }

      // Check if the logged-in user is the owner of the cart
      if (cartExists.userId !== userId) {
        throw new UnauthorizedRequest(
          "cartId",
          `You do not have permission to modify this cart. Cart belongs to user ID ${cartExists.userId}.`
        );
      }
      const response = await CartProduct.destroy({
        where: { cartId: id },
      });
      if (!response) {
        throw new NotFound("Product not found in the cart", productId);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getCartProduct(cartId, userId) {
    try {
      const cartExists = await Cart.findByPk(cartId);
      if (!cartExists) {
        throw new BadRequest("cartId", `Cart with ID ${cartId} not found.`);
      }

      // Check if the logged-in user is the owner of the cart
      if (cartExists.userId !== userId) {
        throw new UnauthorizedRequest(
          "cartId",
          `You do not have permission to modify this cart. Cart belongs to user ID ${cartExists.userId}.`
        );
      }
      const response = await CartProduct.findAll({
        where: { cartId: cartId },
      });
      if (!response) {
        throw new NotFound("Product not found in the cart", productId);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //   async updateCart(userId, cartId, productId, shouldAddProduct = true) {
  //     try {
  //       //   const cartExists = await Cart.findByPk(cartId);
  //       //   if (!cartExists) {
  //       //     throw new BadRequest("cartId", `Cart with ID ${cartId} not found.`);
  //       //   }
  //       const cartExists = await Cart.findByPk(cartId);
  //       if (!cartExists) {
  //         throw new BadRequest("cartId", `Cart with ID ${cartId} not found.`);
  //       }

  //       // Check if the logged-in user is the owner of the cart
  //       if (cartExists.userId !== userId) {
  //         throw new UnauthorizedRequest(
  //           "cartId",
  //           `You do not have permission to modify this cart. Cart belongs to user ID ${cartExists.userId}.`
  //         );
  //       }

  //       const productExists = await Product.findByPk(productId);
  //       if (!productExists) {
  //         throw new BadRequest(
  //           "productId",
  //           `Product with ID ${productId} not found.`
  //         );
  //       }
  //       const result = await CartProduct.findOne({
  //         where: {
  //           [Op.and]: [
  //             {
  //               cartId: cartId,
  //             },
  //             { productId: productId },
  //           ],
  //         },
  //       });
  //       if (shouldAddProduct) {
  //         if (!result) {
  //           await CartProduct.create({
  //             cartId,
  //             productId,
  //           });
  //         } else {
  //           await result.increment({ quantity: 1 });
  //         }
  //         // await Productss.addProductToCart(cartId, productId);
  //       } else {
  //         if (!result) {
  //           throw new NotFound("result is not found", productId);
  //         }
  //         if (result.quantity == 1) {
  //           await CartProduct.destroy({
  //             where: {
  //               [Op.and]: [{ cartId: cartId }, { productId: productId }],
  //             },
  //           });
  //         } else {
  //           await result.decrement({ quantity: 1 });
  //         }
  //         // await Productss.removeProductFromCart(cartId, productId);
  //       }
  //       const response = await CartProduct.findAll({
  //         where: {
  //           cartId: cartId,
  //         },
  //       });
  //       return {
  //         cart: cartId,
  //         items: response,
  //       };
  //     } catch (error) {
  //       if (error.name === "SequelizeForeignKeyConstraintError") {
  //         throw new BadRequest(
  //           "cartId or productId",
  //           "Invalid cart or product ID. Foreign key constraint failed."
  //         );
  //       }
  //       throw error;
  //     }
  //   }
  async updateCart(userId, cartId, productId, shouldAddProduct = true) {
    try {
      const cartExists = await Cart.findByPk(cartId);
      if (!cartExists) {
        throw new BadRequest("cartId", `Cart with ID ${cartId} not found.`);
      }

      // Check if the logged-in user is the owner of the cart
      if (cartExists.userId !== userId) {
        throw new UnauthorizedRequest(
          "cartId",
          `You do not have permission to modify this cart. Cart belongs to user ID ${cartExists.userId}.`
        );
      }

      const productExists = await Product.findByPk(productId);
      if (!productExists) {
        throw new BadRequest(
          "productId",
          `Product with ID ${productId} not found.`
        );
      }

      const result = await CartProduct.findOne({
        where: {
          cartId: cartId,
          productId: productId,
        },
      });

      if (shouldAddProduct) {
        if (!result) {
          await CartProduct.create({
            cartId,
            productId,
            quantity: 1, // Initialize quantity to 1 when adding a new product
          });
        } else {
          await result.increment({ quantity: 1 });
        }
      } else {
        if (!result) {
          throw new NotFound("result is not found", productId);
        }

        console.log(`Current quantity before decrement: ${result.quantity}`);

        if (result.quantity === 1) {
          // If the quantity is 1, remove the product from the cart
          await CartProduct.destroy({
            where: {
              cartId: cartId,
              productId: productId,
            },
          });
          console.log(
            `Product with ID ${productId} removed from cart ${cartId}.`
          );
        } else {
          // If the quantity is greater than 1, decrement the quantity
          await result.decrement({ quantity: 1 });
          console.log(
            `Decremented quantity for product ID ${productId} in cart ${cartId}.`
          );
        }
      }

      const response = await CartProduct.findAll({
        where: {
          cartId: cartId,
        },
      });
      return {
        cart: cartId,
        items: response,
      };
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        throw new BadRequest(
          "cartId or productId",
          "Invalid cart or product ID. Foreign key constraint failed."
        );
      }
      console.error("Error updating cart:", error); // Log the error for debugging
      throw error;
    }
  }
  async getCartByUserId(userId) {
    try {
      const response = await Cart.findOne({
        where: {
          userId,
        },
      });
      if (!response) {
        throw new NotFound("Cart not found for user ID", userId);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartRepository;
