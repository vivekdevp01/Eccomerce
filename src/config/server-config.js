const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  SALT_ROUND: process.env.SALT_ROUND || 8,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  NODE_ENV: process.env.NODE_ENV,
};
