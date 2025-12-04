import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <ul>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/product">Home</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
