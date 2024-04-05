import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>PicVault</span>
      </div>
      <div className="navbar-right">
        <button className="add-user-btn" onClick={props.addUser_prop}>
          Add User
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
