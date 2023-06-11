import { useState, useEffect } from "react";

import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";

import contactServices from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactServices.getContacts().then((retrievedContacts) => {
      setContacts(retrievedContacts);
    });
  }, []);

  const handleSubmit = (newName, newEmail) => {
    if (newName.trim() !== "") {
      const newContact = { name: newName, email: newEmail };
      if (contacts.find((contact) => contact.name === newName)) {
        alert(`${newName} is already in contacts`);
      } else {
        contactServices.addContact(newContact).then((contact) => {
          setContacts([...contacts, contact]);
        });
      }
    }
  };

  const handleDelete = (contactToBeDeleted) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${contactToBeDeleted.name}?`
      )
    ) {
      contactServices.removeContact(contactToBeDeleted).then(() => {
        setContacts(
          contacts.filter((contact) => contact.id !== contactToBeDeleted.id)
        );
      });
    }
  };

  return (
    <div className="contacts-app">
      <AddContact handleSubmit={handleSubmit} />
      <ContactList contacts={contacts} deleteContact={handleDelete} />
    </div>
  );
};

export default App;
