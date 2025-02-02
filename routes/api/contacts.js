const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/", auth, ctrlWrapper(ctrl.chooseFavoriteContacts));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.deleteById));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
