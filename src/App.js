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
        if (
          window.confirm(
            `${newName} is already in contacts. Do you want to update the email as ${newEmail}`
          )
        ) {
          const oldContact = contacts.find(
            (contact) => contact.name === newName
          );
          const updatedContact = { ...oldContact, email: newEmail };
          contactServices.updateContact(updatedContact).then((contact) => {
            setContacts(
              contacts.map((contact) =>
                contact.id === oldContact.id ? updatedContact : contact
              )
            );
          });
        }
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
