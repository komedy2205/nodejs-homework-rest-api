const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} is allready used`);
  }
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
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
