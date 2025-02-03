const express = require("express");

const { CartController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");
const { CartMiddleware } = require("../../middlewares");
const router = express.Router();

// router.get("/", CategoryController.getAllCategory);

router.patch(
  "/:id",
  CartMiddleware.validateRequest(["productId", "shouldAddProduct"]),
  AuthMiddleware.isLoggedIn,
  CartController.updateCart
);
router.get(
  "/:id/products",
  AuthMiddleware.isLoggedIn,
  CartController.getCartProduct
);
router.delete(
  "/:id/products",
  AuthMiddleware.isLoggedIn,
  CartController.clearCart
);

module.exports = router;
