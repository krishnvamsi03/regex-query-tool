import React, { Component } from "react";
import "../css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginPopUp from "./loginpopup";
import SignUpPopup from "./signuppopup";
import { GlobalStore } from "../index";

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

  showSuccessMessage = () => {
    let successMessageDiv = (
      <div
        id="successMesssage"
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        Login successfull!
      </div>
    );
    return successMessageDiv;
  };

  showFailureMessage = () => {
    let failureMessageDiv = (
      <div class="alert alert-danger" role="alert" id="failedMessage">
        Login failed :) Please try again after some time.
      </div>
    );
    return failureMessageDiv;
  };

  render() {
    let messageDiv = (
      <GlobalStore.Consumer>
        {(context) =>
          context.showMessage
            ? context.token
              ? this.showSuccessMessage()
              : this.showFailureMessage()
            : null
        }
      </GlobalStore.Consumer>
    );
    let navbar = (
      <React.Fragment>
        {messageDiv}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Regez Tool
            </a>
            <div id="authContainer" className="d-flex">
              <GlobalStore.Consumer>
                {(context) =>
                  context.token ? (
                    <button id="logoutLink" className="btn btn-primary">
                      Logout
                    </button>
                  ) : (
                    <React.Fragment>
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
                      <button
                        id="signupLink"
                        className="btn btn-primary"
                        onClick={this.toggleSignUp}
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        Sign Up
                      </button>
                    </React.Fragment>
                  )
                }
              </GlobalStore.Consumer>
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
