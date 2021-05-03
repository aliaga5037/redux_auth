import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">Home</Link>
        <Link to="/signup">Register</Link>
        <Link to="/signin">Login</Link>
      </div>
    </nav>
  );
};

export default Nav;
