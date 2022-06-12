const { Contact } = require("../../models");

const chooseFavoriteContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(5),
  }).populate("owner", "email subscription");
  const favoriteContacts = await Contact.find({ favorite: true }, "", {
    skip,
    limit: Number(5),
  }).populate("owner", "favorite");
  // res.status(200).json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     result: contacts,
  //   },
  // });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: favoriteContacts,
    },
  });
};

module.exports = chooseFavoriteContacts;
