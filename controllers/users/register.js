const User = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../utils");

const { controllerWrapper, requestError } = require("../../utils/index");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw requestError(409, `User with email ${email} already exists`);
  }
  const avatarURL = gravatar.url(email);

  const verificationToken = v4();
  await sendEmail(email, verificationToken);

  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = controllerWrapper(register);
