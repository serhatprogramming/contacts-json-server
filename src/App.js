import { useState, useEffect } from "react";

import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";

import contactServices from "./services/contacts";

import Notification from "./components/Notification";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [notification, setNotification] = useState(null);

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
          notify(
            "warning",
            `${newName}'s email updated successfully as ${newEmail}`
          );
        }
      } else {
        contactServices.addContact(newContact).then((contact) => {
          setContacts([...contacts, contact]);
        });
        notify("information", `${newName} added successfully`);
      }
    }
  };

  const handleDelete = (contactToBeDeleted) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${contactToBeDeleted.name}?`
      )
    ) {
      contactServices
        .removeContact(contactToBeDeleted)
        .then(() => {
          setContacts(
            contacts.filter((contact) => contact.id !== contactToBeDeleted.id)
          );
          notify("warning", `${contactToBeDeleted.name} deleted successfully`);
        })
        .catch((error) => {
          notify(
            "error",
            `Error deleting ${contactToBeDeleted.name}. It was already removed`
          );
          setContacts(
            contacts.filter((contact) => contact.id !== contactToBeDeleted.id)
          );
        });
    }
  };

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="contacts-app">
      <Notification notification={notification} />
      <AddContact handleSubmit={handleSubmit} />
      <ContactList contacts={contacts} deleteContact={handleDelete} />
    </div>
  );
};

export default App;
