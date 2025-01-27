const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
async function signUp(req, res, next) {
  try {
    const user = await UserService.signUp({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
async function signIn(req, res, next) {
  try {
    const user = await UserService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User signed in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp,
  signIn,
};
