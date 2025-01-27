const BadRequest = require("../errors/badRequestError");
const ConflictError = require("../errors/conflictError");
const NotFound = require("../errors/notfound");
const UnauthorizedRequest = require("../errors/unauthorizedError");
const { UserRepository } = require("../repositories");
const { Auth } = require("../utils/common");
const userRepository = new UserRepository();

async function signUp(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      const explanation = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      throw new ConflictError(
        "Validation failed for the provided data. Please correct the errors and try again.",
        explanation
      );
    }
    console.log(error);
    throw error;
  }
}
async function signIn(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new NotFound("email", data.email);
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedRequest(
        "Invalid credentials.",
        `The password you entered for ${data.email} is incorrect. Please try again..`
      );
    }
    return passwordMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signUp,
  signIn,
};
