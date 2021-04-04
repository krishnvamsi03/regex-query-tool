import React, { Component } from "react";
import SavedRegex from "./savedregex";
import "../css/main.css";
import "bootstrap/dist/css/bootstrap.css";

class Main extends Component {
  render() {
    let expressionInput = (
      <div className="container-fluid row">
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
                />
              </div>
            </div>
            <div id="selectContainer" className="input-group mb-3 col-2">
              <select
                className="custom-select"
                aria-label="Default select example"
                defaultValue = "JavaScript"
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
                />
              </div>
              <button className="btn btn-primary btn-block" type="submit">
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
    );
    return expressionInput;
  }
}

export default Main;
