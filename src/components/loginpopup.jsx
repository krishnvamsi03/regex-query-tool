import React, { Component } from "react";
import "../css/loginpopup.css";
import { authLogin, fetchRegex } from "../store/actions/auth";
import { GlobalStore } from "../index";

class LoginPopUp extends Component {
  state = {
    showPasswordResetWindow: false,
  };

  handleSubmitAction = (dispatch) => {
    let oUsername = document.getElementById("loginInput");
    let oPassword = document.getElementById("passwordInput");
    if (oUsername && oPassword) {
      dispatch(authLogin(oUsername.value, oPassword.value));
      dispatch(fetchRegex());
    }
    this.props.onDismiss();
  };

  render() {
    const { dispatch } =
      GlobalStore._currentValue;
    let data = (
      <div id="popupWindow" className="modals">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">User Login</h4>
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
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  required="required"
                  spellcheck="false"
                  data-ms-editor="true"
                  id="loginInput"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                  id="passwordInput"
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block login-btn"
                  onClick={() => this.handleSubmitAction(dispatch)}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn" onClick={this.props.ResetWindow}>
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    );
    return data;
  }
}

export default LoginPopUp;
