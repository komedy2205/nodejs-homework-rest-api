const { Contact } = require("../../models");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      data: {
        message: "Not Found",
      },
    });
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
