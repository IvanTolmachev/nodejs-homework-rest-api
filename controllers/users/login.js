const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const User = require("../../models/user");
const { controllerWrapper, requestError } = require("../../utils/index");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw requestError(401, `No user with such email`);
  }

  if (!user.verify) {
    throw requestError(401, "Email is not verified yet");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw requestError(401, `Email or password is wrong`);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: { email: user.email, password: user.subscription },
  });
};

module.exports = controllerWrapper(login);
