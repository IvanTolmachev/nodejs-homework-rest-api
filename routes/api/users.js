const express = require("express");
const { validationBody, authenticate, upload } = require("../../middlewares");
const userSchema = require("../../schema/userShema");
const {
  register,
  login,
  logout,
  getUsersData,
  updateSubscription,
  updateAvatar,
  resendVerificationEmail,
  verificationEmail,
} = require("../../controllers/users");

const router = express.Router();

router.post("/register", validationBody(userSchema.registerSchema), register);
router.get("/verify/:verificationToken", verificationEmail);
router.post(
  "/verify",
  validationBody(userSchema.resentVerificationSchema),
  resendVerificationEmail
);
router.post("/login", validationBody(userSchema.loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getUsersData);
router.patch(
  "/",
  authenticate,
  validationBody(userSchema.subscriptionSchema),
  updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
