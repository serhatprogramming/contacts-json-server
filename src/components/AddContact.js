import { useState } from "react";

const AddContact = ({ handleSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(newName, newEmail);
    setNewName("");
    setNewEmail("");
  };

  return (
    <>
      <h2>Add a New Contact</h2>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter contact name"
        />
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter email address"
        />
        <button type="submit">Add Contact</button>
      </form>
    </>
  );
};

export default AddContact;
