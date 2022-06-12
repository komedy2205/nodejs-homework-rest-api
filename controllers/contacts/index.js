const listContacts = require("./listContacts");
const getById = require("./getById");
const addContact = require("./addContact");
const updateById = require("./updateById");
const deleteById = require("./deleteById");
const updateStatusContact = require("./updateStatusContact");
const chooseFavoriteContacts = require("./chooseFavoriteContacts");

module.exports = {
  listContacts,
  getById,
  addContact,
  updateById,
  deleteById,
  updateStatusContact,
  chooseFavoriteContacts,
};
