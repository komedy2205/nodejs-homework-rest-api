const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "volodymyr_bielov@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "mdjvndkfvmrml@gmail.com",
  from: "volodymyr_bielov@meta.ua",
  subject: "Успішна реєстрація",
  html: "<p>Ви успішно зареєструвалися</p>",
};

transporter
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
