const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;