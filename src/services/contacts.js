import axios from "axios";
const API_URL = "http://localhost:3001/contacts";

const getContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addContact = async (newContact) => {
  const response = await axios.post(API_URL, newContact);
  return response.data;
};

const removeContact = async (newContact) => {
  const response = await axios.delete(`${API_URL}/${newContact.id}`);
  return response.data;
};

const updateContact = async (newContact) => {
  const response = await axios.put(`${API_URL}/${newContact.id}`, newContact);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getContacts, addContact, removeContact, updateContact };
