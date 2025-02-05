const express = require("express");

const { OrderController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

// const { CategoryMiddleware } = require("../../middlewares");
const router = express.Router();
router.post("/", AuthMiddleware.isLoggedIn, OrderController.createOrder);
router.get("/:id", AuthMiddleware.isLoggedIn, OrderController.getOrder);

module.exports = router;
