const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../services/contactService");

const getContactsController = async (req, res) => {
  const { id } = req.user;

  const contacts = await getContacts(id);
  return res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, id);

  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const { id } = req.user;
  const result = await addContact(req.body, id);
  res.status(200).json({ message: "success", result });
};

const removeContactController = async (req, res) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const contact = await removeContact(contactId, id);
  res.status(200).json({ message: "deleted", contact });
};

const updateContactController = async (req, res) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body, id);
  res.status(200).json({ status: "success", contact: contact });
};

const updateStatusContactController = async (req, res) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const { favorite } = req?.body;

  const contact = await updateStatusContact(contactId, favorite, id);
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
