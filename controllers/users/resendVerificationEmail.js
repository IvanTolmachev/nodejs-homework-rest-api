const User = require("../../models/user");
const { requestError, sendEmail } = require("../../utils");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw requestError(404, "User not found");
  }

  if (user.verify) {
    throw requestError(400, "Verification has already been passed");
  }

  await sendEmail(email, user.verificationToken);

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerificationEmail;
