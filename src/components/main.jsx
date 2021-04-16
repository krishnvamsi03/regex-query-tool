import React, { Component, useContext, useReducer } from "react";
import SavedRegex from "./savedregex";
import "../css/main.css";
import "bootstrap/dist/css/bootstrap.css";
import GlobalStore from "../index";
import reducer, { initialState } from "../store/reducers/auth";

class Main extends Component {
  static contextType = GlobalStore;

  constructor() {
    super();
    console.log("Main function called");
  }

  componentDidMount = () => {
    console.log(GlobalStore);
    const value = this.context;
    console.log(value);
  };

  render() {
    // console.log("Test", { GlobalStore });
    // const { value } = { GlobalStore };
    // console.log(value);
    // const { token, error, loading, dispatch, state } = GlobalStore;
    // console.log("state", state);
    // let spinner = loading ? (
    //   <div id="spinner" class="d-flex justify-content-center">
    //     <div class="spinner-border text-primary" role="status">
    //       <span class="sr-only">Loading...</span>
    //     </div>
    //   </div>
    // ) : null;
    console.log("Test", this.value);
    let expressionInput = (
      <React.Fragment>
        {/* {spinner} */}
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
                <div id="selectContainer" className="input-group mb-3 col-2">
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
                    type="submit"
                  >
                    Save
                  </button>
                </form>
                <div id="savedRegex">
                  <p>Saved Regex</p>
                  <div></div>
                </div>
              </div>
              <SavedRegex />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    return expressionInput;
  }
}

export default Main;
