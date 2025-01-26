const express = require("express");

const { CategoryController } = require("../../controllers");
const { CategoryMiddleware } = require("../../middlewares");
const router = express.Router();

router.get("/", CategoryController.getAllCategory);
router.post(
  "/",
  CategoryMiddleware.validateRequest(["name", "description"]),
  CategoryController.createCategory
);
router.get("/:id", CategoryController.getCategory);
router.delete("/:id", CategoryController.destroyCategory);
router.put("/:id", CategoryController.updateCategory);

module.exports = router;
