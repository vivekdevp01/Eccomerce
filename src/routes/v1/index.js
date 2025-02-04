const express = require("express");

const { InfoController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");
const categoryRouter = require("./category-routes");
const productRouter = require("./product-routes");
const userRouter = require("./user-routes");
const cartRouter = require("./cart-router");
const orderRouter = require("./order-router");
const router = express.Router();

// router.get("/info", InfoController.info);
router.get("/authping", AuthMiddleware.isLoggedIn, InfoController.info);
router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/user", userRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);

module.exports = router;
