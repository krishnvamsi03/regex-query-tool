import React, { Component } from "react";
import "../css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";

class Navbar extends Component {
  render() {
    let navbar = (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Regez Tool
          </a>
          <div id="authContainer" className="d-flex">
            <a href="#" id="loginLink">
              Login |
            </a>
            <a href="#" id="signupLink">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    );
    return navbar;
  }
}

export default Navbar;
