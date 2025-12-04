import React from "react";
  import Nav from './Nav'

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Additional logout logic if needed
    window.location.href = "/"; // Redirect to login page
    
  };

  return <header>Header
    <Nav />
    <button onClick={handleLogout}>logout</button>
  </header>;
};

export default Header;
