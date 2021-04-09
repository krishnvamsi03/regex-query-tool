import React, { Component } from "react";
import "../css/loginpopup.css";

class LoginPopUp extends Component {
  state = {};
  render() {
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
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-success btn-lg btn-block login-btn"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </div>
    );
    return data;
  }
}

export default LoginPopUp;
