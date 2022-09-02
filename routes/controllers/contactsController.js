const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../services/contactService");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  return res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const result = await addContact(req.body);
  res.status(200).json({ message: "success", result });
};

const removeContactController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);
  res.status(200).json({ message: "deleted", contact });
};

const updateContactController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await updateContact(id, req.body);
  res.status(200).json({ status: "success", contact: contact });
};

const updateStatusContactController = async (req, res) => {
  const id = req.params.contactId;
  const { favorite } = req?.body;

  const contact = await updateStatusContact(id, favorite);
  res.status(200).json(contact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
