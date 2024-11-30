// src/App.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import AuthService from "./authService"; // Import the authService component

const App = () => {
  const [user, setUser ] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser );
    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  return (
    <div>
      <Navbar user={user} />
      {!user ? (
        <AuthService setUser ={setUser } /> // Pass setUser  to the authService component
      ) : (
        <>
          <AddContact />
          <ContactList />
        </>
      )}
    </div>
  );
};

export default App;