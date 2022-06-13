const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      data: {
        message: "Email or password is wrong",
      },
    });
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    return res.status(401).json({
      status: "error",
      code: 401,
      data: {
        message: "Email or password is wrong",
      },
    });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
