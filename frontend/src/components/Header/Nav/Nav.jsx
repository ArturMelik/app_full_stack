import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-bar">
  <ul>
    <li><Link to="/product">Home</Link></li>
    <li><Link to="/favorites">Favorites</Link></li>
    <li><Link to="/login">My account</Link></li>
    <li><Link to="/signup">Sign Up</Link></li>
  </ul>
</nav>
  );
};

export default Nav;
