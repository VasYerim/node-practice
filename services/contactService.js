const { Contact } = require("../db/contactModel");
const { WrongParameterError } = require("../helpers/errors");

const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return { message: `Contact with ID: ${id} not found` };
    }
    return contact;
  } catch (error) {
    throw new WrongParameterError(`Failure, contact with id: ${id} not found`);
  }
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  const result = await contact.save();
  return result;
};

const removeContact = async (id) => {
  const contact = await Contact.findByIdAndRemove(id);
  return contact;
};

const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { $set: { ...body } },
    { returnDocument: "after" }
  );
  return contact;
};

const updateStatusContact = async (id, favorite) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite } },
    { returnDocument: "after" }
  );
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
