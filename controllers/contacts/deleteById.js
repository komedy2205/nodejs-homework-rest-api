const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const deleteById = async (req, res) => {
 
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
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
