import React, { Component } from "react";
import SavedRegex from "./savedregex";
import "../css/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { GlobalStore } from "../index";
import { saveRegexs } from "../store/actions/saveRegex";

class Main extends Component {
  handleSaveAction = (token) => {
    let saveMessage = document.getElementById("saveMessage");
    if (saveMessage) {
      saveMessage.classList.add("alert");
      saveMessage.classList.add("alert-danger");
      if (!token) {
        saveMessage.innerText = "Kindly login to save your details";
        saveMessage.style.display = "block";
        setTimeout(() => {
          saveMessage.style.display = "none";
        }, 2000);
      } else {
        let expressionInput = document.getElementById("expressionInput");
        let expressionName = document.getElementById("saveInput");
        if (expressionInput && !expressionInput.value) {
          saveMessage.innerText = "Kindly enter some regex expression";
          saveMessage.style.display = "block";
          setTimeout(() => {
            saveMessage.style.display = "none";
          }, 2000);
        } else if (expressionName && !expressionName.value) {
          saveMessage.innerText = "Kindly enter name of expression";
          saveMessage.style.display = "block";
          setTimeout(() => {
            saveMessage.style.display = "none";
          }, 2000);
        } else {
          let language = document.getElementById("selectContainer");
          saveRegexs(
            token,
            expressionInput.value,
            expressionName.value,
            language.children[0].value
          );
        }
      }
    }
  };

  render() {
    let spinner = (
      <GlobalStore.Consumer>
        {(context) =>
          context.loading ? (
            <div id="spinner" className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : null
        }
      </GlobalStore.Consumer>
    );
    let successSaveMessage = (
      <div className="" role="alert" id="saveMessage"></div>
    );
    let expressionInput = (
      <GlobalStore.Consumer>
        {(context) => (
          <React.Fragment>
            {spinner}
            <div className="container">
              <div id="main" className="row">
                <div className="col-8">
                  <div className="expressionContainer row no-gutters">
                    <div id="expressionDiv" className="col-10">
                      <label htmlFor="expressionInput" className="form-label">
                        Enter Regex Expression
                      </label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="expressionInput"
                          aria-describedby="basic-addon3"
                          placeholder="Enter Regex Expression"
                        />
                      </div>
                    </div>
                    <div
                      id="selectContainer"
                      className="input-group mb-3 col-2"
                    >
                      <select
                        className="custom-select"
                        aria-label="Default select example"
                        defaultValue="JavaScript"
                      >
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-floating">
                    <label htmlFor="testInput">Test String</label>
                    <textarea
                      className="form-control"
                      placeholder="Test your string here"
                      id="testInput"
                    ></textarea>
                  </div>
                </div>
                <div className="col-4">
                  <div id="formContainer">
                    <form>
                      <label htmlFor="saveInput" className="form-label">
                        Save this Regex
                      </label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="saveInput"
                          aria-describedby="basic-addon3"
                          placeholder="Name of the Regex"
                          required
                        />
                      </div>
                      <button
                        className="btn btn-outline-primary btn-block"
                        type="button"
                        onClick={() => this.handleSaveAction(context.token)}
                      >
                        Save
                      </button>
                      {successSaveMessage}
                    </form>
                    <div id="savedRegex">
                      <p>Saved Regex</p>
                      <div></div>
                    </div>
                  </div>
                  {context.token ? (
                    <SavedRegex />
                  ) : (
                    <div className="alert alert-info" role="alert">
                      Login to see your saved regex
                    </div>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </GlobalStore.Consumer>
    );
    return expressionInput;
  }
}

export default Main;
