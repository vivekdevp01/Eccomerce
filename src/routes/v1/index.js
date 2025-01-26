const express = require("express");

const { InfoController } = require("../../controllers");
const categoryRouter = require("./category-routes");
const productRouter = require("./product-routes");
const router = express.Router();

router.get("/info", InfoController.info);
router.use("/category", categoryRouter);
router.use("/products", productRouter);

module.exports = router;
