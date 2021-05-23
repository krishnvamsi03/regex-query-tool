import React, { Component, useContext } from "react";
import SavedRegex from "./savedregex";
import Pattern from "./patterns";
import "../css/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { GlobalStore } from "../index";
import { saveRegexs } from "../store/actions/saveRegex";
import { validateFindRegex } from "../store/actions/main";
import { showLoadingIndicator } from "../store/actions/auth";
import axios from "axios";

class Main extends Component {
  state = {
    showPatterns: true,
    list: [],
  };

  showPatternDiv = null;
  spinner = null;
  handleSaveAction = async (token, dispatch) => {
    let saveMessage = document.getElementById("saveMessage");
    if (saveMessage) {
      saveMessage.classList.remove("alert-info");
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
          dispatch(showLoadingIndicator());
          let message = await saveRegexs(
            token,
            expressionName.value,
            expressionInput.value,
            language.children[0].value
          );
          dispatch(showLoadingIndicator());
          saveMessage.classList.remove("alert-danger");
          saveMessage.classList.add("alert-info");
          saveMessage.innerText = message;
          saveMessage.style.display = "block";
          setTimeout(() => {
            saveMessage.style.display = "none";
          }, 2000);
          //this.forceUpdate();
        }
      }
    }
  };

  togglePatternPopup = () => {
    if (this.state.showPatterns) {
      const matches = validateFindRegex();
      this.showPatternDiv = (
        <Pattern onDismiss={this.togglePatternPopup} matches={matches} />
      );
    } else {
      this.showPatternDiv = null;
    }
    this.setState({ showPatterns: !this.state.showPatterns });
  };

  fetchRegex = (show, token = null) => {
    if (show && token) {
      axios
        .post("http://localhost:8000/api/saved", { token: token })
        .then((response) => {
          if (response && response.data) {
            let list = [];
            for (let item of response.data.list) {
              let temp = {};
              temp["id"] = item.id;
              temp["regexName"] = item.regexname;
              temp["regexPattern"] = item.regexpattern;
              temp["showCard"] = false;
              list.push(temp);
            }
            this.setState({ list: list });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ list: [] });
    }
  };

  componentDidMount = () => {
    <GlobalStore.Consumer>
      {(context) => this.fetchRegex(true, context.token)}
    </GlobalStore.Consumer>;
  };

  render() {
    this.spinner = (
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
            {this.spinner}
            <div className="container">
              <div id="main" className="row">
                <div className="col-8">
                  <div className="expressionContainer row no-gutters">
                    <div id="expressionDiv" className="col-8">
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
                          // onBlurCapture={(e) => validateFindRegex(e)}
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
                        {/* <option value="Python">Python</option> */}
                      </select>
                    </div>
                    <div id="getPatternBtn" className="col-2">
                      <button
                        className="btn btn-primary"
                        onClick={this.togglePatternPopup}
                      >
                        Get Patterns
                      </button>
                    </div>
                  </div>
                  <div className="form-floating">
                    <label htmlFor="testInput">Test String</label>
                    <div
                      className="form-control"
                      placeholder="Test your string here"
                      id="testInput"
                      contentEditable="true"
                    ></div>
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
                        onClick={() =>
                          this.handleSaveAction(context.token, context.dispatch)
                        }
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
                    <SavedRegex
                      token={context.token}
                      list={this.state.list}
                      dispatch={context.dispatch}
                    />
                  ) : (
                    <div className="alert alert-info" role="alert">
                      Login to see your saved regex
                    </div>
                  )}
                </div>
              </div>
            </div>
            {this.showPatternDiv}
          </React.Fragment>
        )}
      </GlobalStore.Consumer>
    );
    return expressionInput;
  }
}

export default Main;
