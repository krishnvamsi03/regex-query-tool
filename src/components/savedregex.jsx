import React, { Component } from "react";
import "../css/savedregex.css";
import "bootstrap/dist/css/bootstrap.css";

class SavedRegex extends Component {
  state = {
    id1: {
      regexName: "test",
      regexPattern: "TestPattern",
    },
    id2: {
      regexName: "test1",
      regexPattern: "Test2Pattern",
    },
    id3: {
      regexName: "test2",
      regexPattern: "pattern",
    },
  };

  deleteRecord = (Id) => {
    const state = { ...this.state };
    delete state[Id];
    this.setState(state);
  };

  render() {
    let data = (
      <div className="saveContainer">
        {Object.keys(this.state).map((ele) => (
          <React.Fragment>
            <div
              id={"card-" + ele}
              key={"card-" + ele}
              className="savedCards"
              selected={true}
            >
              <div className="row">
                <div className="col-10">
                  <p>{this.state[ele].regexName}</p>
                </div>
                <div className="col-2">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/regex-query-tool.appspot.com/o/delete%20(1).png?alt=media&token=36d6a099-829d-4540-80a1-7254a0f7d796"
                    className="trashIcon"
                    onClick={() => this.deleteRecord(ele)}
                  ></img>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
    return data;
  }
}

export default SavedRegex;
