const { Contact } = require("../db/contactModel");
const { WrongParameterError } = require("../helpers/errors");

const getContacts = async (userId) => {
  const contacts = await Contact.find({ userId });
  return contacts;
};

const getContactById = async (contactId, userId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, userId });
    if (!contact) {
      return { message: `Contact with ID: ${contactId} not found` };
    }
    return contact;
  } catch (error) {
    throw new WrongParameterError(
      `Failure, contact with id: ${contactId} not found`
    );
  }
};

const addContact = async ({ name, email, phone, favorite }, userId) => {
  const contact = new Contact({ name, email, phone, favorite, userId });
  const result = await contact.save();
  return result;
};

const removeContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndRemove({ _id: contactId, userId });
  return contact;
};

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: { ...body } },
    { returnDocument: "after" }
  );
  return contact;
};

const updateStatusContact = async (contactId, favorite, userId) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, userId },
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
