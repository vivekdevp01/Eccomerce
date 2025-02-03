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
    res.cookie("token", user.token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User signed in successfully",
      data: process.env.NODE_ENV === "production" ? true : user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp,
  signIn,
};
