const Contact = require("../../models/contacts.js");

const addContact = async (req, res, _) => {
  const { body } = req;
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...body, owner });
  res.status(201).json(result);
};

module.exports = addContact;
