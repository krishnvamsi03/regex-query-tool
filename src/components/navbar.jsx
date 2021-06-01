import React, { Component } from "react";
import "../css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginPopUp from "./loginpopup";
import SignUpPopup from "./signuppopup";
import ForgotPassword from "./forgotpassword";
import { GlobalStore } from "../index";
import { authLogout, fetchRegex } from "../store/actions/auth";

class Navbar extends Component {
  state = {
    showpopup: true,
    showSignUpPopup: true,
    showPassWordReset: true,
  };
  div = null;
  signUpDiv = null;
  passwordResetDiv = null;

  togglePopUp = () => {
    if (this.state.showpopup) {
      this.div = (
        <LoginPopUp
          onDismiss={this.togglePopUp}
          ResetWindow={this.togglePasswordReset}
        />
      );
      this.signUpDiv = null;
    } else {
      this.div = null;
    }
    this.setState({ showpopup: !this.state.showpopup });
  };

  toggleSignUp = () => {
    if (this.state.showSignUpPopup) {
      this.signUpDiv = (
        <SignUpPopup
          onDismiss={this.toggleSignUp}
          renderLogin={this.toggleLoginFromSignUp}
        />
      );
      this.div = null;
    } else {
      this.signUpDiv = null;
    }
    this.setState({ showSignUpPopup: !this.state.showSignUpPopup });
  };

  togglePasswordReset = () => {
    if (this.state.showPassWordReset) {
      this.passwordResetDiv = (
        <ForgotPassword onDismiss={this.togglePasswordReset} />
      );
      this.div = null;
    } else {
      this.passwordResetDiv = null;
    }
    this.setState({
      showPassWordReset: !this.state.showPassWordReset,
      showpopup: true,
    });
  };

  toggleLoginFromSignUp = () => {
    this.togglePopUp();
    this.setState({ showSignUpPopup: true });
  };

  showSuccessMessage = (login = true) => {
    let successMessageDiv = (
      <div
        id="successMesssage"
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {login
          ? "Login successfull!"
          : "Sign up successfull, kindly click on login to continue"}
      </div>
    );
    return successMessageDiv;
  };

  showFailureMessage = (login = true) => {
    let failureMessageDiv = (
      <div className="alert alert-danger" role="alert" id="failedMessage">
        {login
          ? "Login failed :) Please try again after some time."
          : "Sign up failed :) please try again after some time"}
      </div>
    );
    return failureMessageDiv;
  };

  handleLogoutAction = (dispatch) => {
    if (dispatch) {
      dispatch(authLogout());
      dispatch(fetchRegex());
    }
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

    let signMessageDiv = (
      <GlobalStore.Consumer>
        {(context) =>
          context.showSignUpMessage
            ? context.token
              ? this.showSuccessMessage(false)
              : this.showFailureMessage(false)
            : null
        }
      </GlobalStore.Consumer>
    );

    let navbar = (
      <React.Fragment>
        {messageDiv}
        {signMessageDiv}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Regez Tool
            </a>
            <div id="authContainer" className="d-flex">
              <GlobalStore.Consumer>
                {(context) =>
                  context.token ? (
                    <button
                      id="logoutLink"
                      className="btn btn-primary"
                      onClick={() => this.handleLogoutAction(context.dispatch)}
                    >
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
        {this.passwordResetDiv}
      </React.Fragment>
    );
    return navbar;
  }
}

export default Navbar;
