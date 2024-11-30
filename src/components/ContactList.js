// src/components/ContactList.js
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // Ensure this path is correct

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contacts"), (snapshot) => {
      setContacts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "contacts", id)); // Use deleteDoc and doc for deleting
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setUpdatedContact({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    });
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "contacts", id), updatedContact); // Use updateDoc and doc for updating
    setEditingId(null); // Reset editing state
    setUpdatedContact({ name: "", phone: "", email: "" }); // Clear the updated contact state
  };

  return (
    <div>
      <h3>Contacts</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {editingId === contact.id ? (
              <div>
                <input
                  type="text"
                  value={updatedContact.name}
                  onChange={(e) =>
                    setUpdatedContact({
                      ...updatedContact,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={updatedContact.phone}
                  onChange={(e) =>
                    setUpdatedContact({
                      ...updatedContact,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone"
                />
                <input
                  type="email"
                  value={updatedContact.email}
                  onChange={(e) =>
                    setUpdatedContact({
                      ...updatedContact,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email"
                />
                <button onClick={() => handleUpdate(contact.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>
                  {contact.name} - {contact.phone} - {contact.email}
                </span>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
                <button onClick={() => handleEdit(contact)}>Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
