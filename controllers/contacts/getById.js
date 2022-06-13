const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
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
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
