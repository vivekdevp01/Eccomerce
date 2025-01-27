const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  SALT_ROUND: process.env.SALT_ROUND || 8,
};
