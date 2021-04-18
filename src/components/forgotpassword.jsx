import React, { Component } from "react";
import "../css/loginpopup.css";
import * as actions from "../store/actions/resetPassword";

class ForgotPassword extends Component {
  state = {};

  handleSubmitAction = () => {
    let oResetEmailId = document.getElementById("resetEmailId");
    let oMessage = document.getElementById("successMessage");
    let oFailMessage = document.getElementById("failureMessage");
    let oValid = document.getElementById("validResetEmail");
    let oInvalid = document.getElementById("inValidResetEmail");
    if (oResetEmailId) {
      if (oResetEmailId.value) {
        if (
          !oResetEmailId.value.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        ) {
          oInvalid.style.display = "block";
          oInvalid.innerText = "Invalid Email address";
          return;
        } else {
          oInvalid.style.display = "none";
        }

        if (actions.generatePasswordResetLink(oResetEmailId.value)) {
          oInvalid.style.display = "none";
          oMessage.style.display = "block";
          setTimeout(() => {
            oMessage.style.display = "none";
          }, 3000);
        } else {
          oFailMessage.style.display = "block";
          setTimeout(() => {
            oFailMessage.style.display = "none";
          }, 3000);
        }
      } else {
        if (oInvalid) {
          oInvalid.style.display = "block";
          oInvalid.innerText = "Email Id field is empty";
        }
      }
    }
  };

  render() {
    let data = (
      <div id="forgotWindow" className="modals">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Reset Password</h4>
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
              <div className="form-group">
                <input
                  id="resetEmailId"
                  type="text"
                  className="form-control"
                  name="emailid"
                  placeholder="Email Id"
                  required="required"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <div id="validResetEmail" className="valid-feedback"></div>
                <div id="inValidResetEmail" className="invalid-feedback">
                  Email ID is not valid email id.
                </div>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block login-btn"
                  onClick={this.handleSubmitAction}
                >
                  Submit
                </button>
              </div>
            </form>

            <div
              id="successMessage"
              class="alert alert-success"
              role="alert"
              style={{ display: "none" }}
            >
              Password reset link has been sent.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </div>
            <div
              id="failureMessage"
              class="alert alert-danger"
              style={{ display: "none" }}
              role="alert"
            >
              Something went wrong.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </div>
          <div className="modal-footer" style={{ justifyContent: "left" }}>
            <p>
              Note: If Email is not verified, you may not receive reset link.
            </p>
          </div>
        </div>
      </div>
    );
    return data;
  }
}

export default ForgotPassword;
