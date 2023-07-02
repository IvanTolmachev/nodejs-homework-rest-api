const express = require("express");
const { validationBody, authenticate } = require("../../middlewares");
const userSchema = require("../../schema/userShema");
const {
  register,
  login,
  logout,
  getUsersData,
  updateSubscription,
} = require("../../controllers/users");

const router = express.Router();

router.post("/register", validationBody(userSchema.registerSchema), register);
router.post("/login", validationBody(userSchema.loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getUsersData);
router.patch(
  "/",
  authenticate,
  validationBody(userSchema.subscriptionSchema),
  updateSubscription
);

module.exports = router;
