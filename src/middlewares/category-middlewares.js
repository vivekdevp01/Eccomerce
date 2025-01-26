const BadRequest = require("../errors/badRequestError");

function validateRequest(requiredFields) {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      // Construct detailed error for missing fields
      const details = `Missing required field(s): ${missingFields.join(", ")}`;
      throw new BadRequest("ValidationError", details);
    }

    next();
  };
}
module.exports = {
  validateRequest,
};
