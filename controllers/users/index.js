const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getUsersData = require("./getUserDate");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const resendVerificationEmail = require("./resendVerificationEmail");
const verificationEmail = require("./verificationEmail");
const { controllerWrapper } = require("../../utils/index");

module.exports = {
  register: controllerWrapper(register),
  login,
  logout,
  getUsersData,
  updateSubscription,
  updateAvatar,
  resendVerificationEmail: controllerWrapper(resendVerificationEmail),
  verificationEmail: controllerWrapper(verificationEmail),
};
