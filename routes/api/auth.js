const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSignupSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSignupSchema), ctrlWrapper(ctrl.login));

module.exports = router;
