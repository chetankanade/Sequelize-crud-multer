const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
exports.token = async (id) => {
  const jwtToken = await jwt.sign({ id }, process.env.SECRECT_KEY);
  return jwtToken;
};

exports.verifypass = async (password, hashedPass) => {
  const pass = bcrypt.compare(password, hashedPass);
  if (pass) {
    return true;
  } else {
    return false;
  }
};
