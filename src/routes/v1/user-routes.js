const express = require("express");
const { UserController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");
const router = express.Router();

router.post(
  "/signup",
  UserMiddleware.validateUser(["email", "password"]),
  UserController.signUp
);
router.post(
  "/signin",
  UserMiddleware.validateUser(["email", "password"]),
  UserController.signIn
);

module.exports = router;
