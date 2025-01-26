const express = require("express");

const { ProductController } = require("../../controllers");
// const { CategoryMiddleware } = require("../../middlewares");
const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.post("/", ProductController.createProduct);
router.get("/:id", ProductController.getProduct);
router.delete("/:id", ProductController.destroyProduct);
router.put("/:id", ProductController.updateProduct);

module.exports = router;
