const { User } = require("../../models");

const { sendMail } = require("../../helpers");

const verify = async (req, res) => {
  const { email } = req.body;
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!email) {
    res.json({
      message: "missing required field email",
    });
  }
  if (email && user && verificationToken) {
    const mail = {
      to: email,
      subject: "Підтвердження email",
      html: `<a target="_blank" href="localhost:3000/api/users/verify/${verificationToken}">Натисніть для підтвердження email</a>`,
    };

    await sendMail(mail);
  }
};

module.exports = verify;
