const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { sendMail } = require("../../helpers");
const { User } = require("../../models");

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
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    subscription,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a target="_blank" href="localhost:3000/api/users/verify/${verificationToken}">Натисніть для підтвердження email</a>`,
  };

  await sendMail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
