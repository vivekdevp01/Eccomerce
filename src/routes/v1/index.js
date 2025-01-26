const express = require("express");

const { InfoController } = require("../../controllers");
const categoryRouter = require("./category-routes");
const router = express.Router();

router.get("/info", InfoController.info);
router.use("/category", categoryRouter);

module.exports = router;
