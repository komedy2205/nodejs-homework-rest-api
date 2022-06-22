const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      data: {
        message: "Email in use",
      },
    });
  }
  const avatarURL = gravatar.url(email);
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    subscription,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = signup;
