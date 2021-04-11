import React, { Component } from "react";
import "../css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginPopUp from "./loginpopup";
import SignUpPopup from "./signuppopup";

class Navbar extends Component {
  state = {
    showpopup: true,
    showSignUpPopup: true,
  };
  div = null;
  signUpDiv = null;

  togglePopUp = () => {
    if (this.state.showpopup) {
      this.div = <LoginPopUp onDismiss={this.togglePopUp} />;
      this.signUpDiv = null;
    } else {
      this.div = null;
    }
    this.setState({ showpopup: !this.state.showpopup });
  };

  toggleSignUp = () => {
    if (this.state.showSignUpPopup) {
      this.signUpDiv = <SignUpPopup onDismiss={this.toggleSignUp} />;
      this.div = null;
    } else {
      this.signUpDiv = null;
    }
    this.setState({ showSignUpPopup: !this.state.showSignUpPopup });
  };

  render() {
    let navbar = (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Regez Tool
            </a>
            <div id="authContainer" className="d-flex">
              <button
                id="loginLink"
                type="button"
                className="btn btn-primary"
                onClick={this.togglePopUp}
                data-toggle="modal"
                data-target="#myModal"
              >
                Login
              </button>
              {/* <span id="separator"></span> */}
              <button
                id="signupLink"
                className="btn btn-primary"
                onClick={this.toggleSignUp}
                data-toggle="modal"
                data-target="#myModal"
              >
                Sign Up
              </button>
            </div>
          </div>
        </nav>
        {this.div}
        {this.signUpDiv}
      </React.Fragment>
    );
    return navbar;
  }
}

export default Navbar;
