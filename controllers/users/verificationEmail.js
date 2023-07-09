const User = require("../../models/user");
const { requestError } = require("../../utils");

const verificationEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw requestError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Successful verification",
  });
};

module.exports = verificationEmail;
