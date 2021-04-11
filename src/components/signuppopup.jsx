import React, { Component } from "react";
import "../css/loginpopup.css";
import {
  validateUserName,
  validateEmailId,
  validatePassword,
  validateConfirmPassword,
} from "../utility/signup.js";

class SignUpPopup extends Component {
  state = {};
  render() {
    let data = (
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
            <form action="#" method="post">
              <div className="form-group needs-validation" novalidate>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  required="required"
                  spellcheck="false"
                  data-ms-editor="true"
                  required
                  onBlurCapture={(e) => validateUserName(e)}
                />
                <div id="userNameValid" className="valid-feedback">
                  Looks good!
                </div>
                <div id="userNameInvalid" className="invalid-feedback"></div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email Id"
                  required="required"
                  spellcheck="false"
                  data-ms-editor="true"
                  onBlurCapture={(e) => validateEmailId(e)}
                />
                <div id="validEmail" className="valid-feedback"></div>
                <div id="invalidEmail" className="invalid-feedback"></div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                  id="passwordInput"
                  onBlurCapture={(e) => validatePassword(e)}
                />
                <div id="validPassword" className="valid-feedback"></div>
                <div id="invalidPassword" className="invalid-feedback"></div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required="required"
                  spellcheck="false"
                  data-ms-editor="true"
                  onBlurCapture={(e) => validateConfirmPassword(e)}
                />
                <div id="validConfirmPassword" className="valid-feedback"></div>
                <div
                  id="invalidConfirmPassword"
                  className="invalid-feedback"
                ></div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-success btn-lg btn-block login-btn"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a href="#">Already a User? Log In</a>
          </div>
        </div>
      </div>
    );
    return data;
  }
}

export default SignUpPopup;
