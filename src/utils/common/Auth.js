const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { ServerConfig } = require("../../config");
function checkPassword(plainPassword, encrpytedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encrpytedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  checkPassword,
};
