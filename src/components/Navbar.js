import React from "react";
import { auth } from "../firebase";

const Navbar = ({ user }) => {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav>
      <h2>Contact Manager</h2>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to manage your contacts.</p>
      )}
    </nav>
  );
};

export default Navbar;
