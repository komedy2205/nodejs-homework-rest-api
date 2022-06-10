const { User } = require("../../models");
const bcrypt = require("bcryptjs");

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
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashedPassword,
    subscription,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = signup;
