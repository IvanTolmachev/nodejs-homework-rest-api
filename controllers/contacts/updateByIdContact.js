const Contact = require("../../models/contacts.js");
const { requestError } = require("../../utils/index.js");

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateContactById;
