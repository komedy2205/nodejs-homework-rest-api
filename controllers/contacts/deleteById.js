const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json({
    status: "success",
    message: "contact deleted",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = deleteById;
