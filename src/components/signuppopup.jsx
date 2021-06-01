import React, { Component } from "react";
import GlobalStore from "..";
import "../css/loginpopup.css";
import { authSignUp } from "../store/actions/auth";
import {
  validateUserName,
  validateEmailId,
  validatePassword,
  validateConfirmPassword,
} from "../utility/signup.js";

class SignUpPopup extends Component {
  state = {};

  handleSubmitAction = (dispatch) => {
    if (dispatch) {
      let oSignupForm = document.getElementById("signupForm");
      let oInputs;
      if (oSignupForm) {
        oInputs = oSignupForm.getElementsByClassName("form-control");
      }
      let oValidationDiv = document.getElementById("errorMessage");
      let sUserName, sEmail, sPassword, sConfirmPassword;
      for (let oInput of oInputs) {
        if (oInput && !oInput.value) {
          if (oValidationDiv) {
            oValidationDiv.style.display = "block";
          }
          return;
        } else if (oInput && oInput.value) {
          switch (oInput.id) {
            case "userNameInput":
              sUserName = oInput.value;
              break;
            case "emailInput":
              sEmail = oInput.value;
              break;
            case "passwordInput":
              sPassword = oInput.value;
              break;
            case "confirmPasswordInput":
              sConfirmPassword = oInput.value;
              break;
            default:
              break;
          }
        }
      }
      oValidationDiv.style.display = "none";
      dispatch(authSignUp(sUserName, sEmail, sPassword, sConfirmPassword));
      this.props.onDismiss();
    }
  };

  render() {
    let data = (
      <GlobalStore.Consumer>
        {(context) => (
          <div id="popupWindow" className="modals">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">User Sign Up</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                  onClick={this.props.onDismiss}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form id="signupForm" action="#" method="post">
                  <div className="form-group needs-validation" noValidate>
                    <input
                      id="userNameInput"
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      required="required"
                      spellCheck="false"
                      data-ms-editor="true"
                      onBlurCapture={(e) => validateUserName(e)}
                    />
                    <div id="userNameValid" className="valid-feedback">
                      Looks good!
                    </div>
                    <div
                      id="userNameInvalid"
                      className="invalid-feedback"
                    ></div>
                  </div>
                  <div className="form-group">
                    <input
                      id="emailInput"
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email Id"
                      required="required"
                      spellCheck="false"
                      data-ms-editor="true"
                      onBlurCapture={(e) => validateEmailId(e)}
                    />
                    <div id="validEmail" className="valid-feedback"></div>
                    <div id="invalidEmail" className="invalid-feedback"></div>
                  </div>
                  <div className="form-group">
                    <input
                      id="passwordInput"
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required="required"
                      onBlurCapture={(e) => validatePassword(e)}
                    />
                    <div id="validPassword" className="valid-feedback"></div>
                    <div
                      id="invalidPassword"
                      className="invalid-feedback"
                    ></div>
                  </div>
                  <div className="form-group">
                    <input
                      id="confirmPasswordInput"
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      required="required"
                      spellCheck="false"
                      data-ms-editor="true"
                      onBlurCapture={(e) => validateConfirmPassword(e)}
                    />
                    <div
                      id="validConfirmPassword"
                      className="valid-feedback"
                    ></div>
                    <div
                      id="invalidConfirmPassword"
                      className="invalid-feedback"
                    ></div>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-success btn-lg btn-block login-btn"
                      onClick={() => this.handleSubmitAction(context.dispatch)}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <p
                  id="errorMessage"
                  className="text-danger"
                  style={{ justifyContent: "left", display: "none" }}
                >
                  One or more fields needs to be validated, kindly fill all the
                  details and try again
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={this.props.renderLogin}>
                  Already a User? Log In
                </button>
              </div>
            </div>
          </div>
        )}
      </GlobalStore.Consumer>
    );
    return data;
  }
}

export default SignUpPopup;
