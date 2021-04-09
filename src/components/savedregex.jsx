import React, { Component } from "react";
import "../css/savedregex.css";
import "bootstrap/dist/css/bootstrap.css";

class SavedRegex extends Component {
  state = {
    list: [
      {
        id: "id1",
        regexName: "test",
        regexPattern: "TestPattern",
      },
      {
        id: "id2",
        regexName: "test1",
        regexPattern: "Test2Pattern",
      },
      {
        id: "id3",
        regexName: "test2",
        regexPattern: "pattern",
      },
    ],
  };

  deleteRecord = (Id) => {
    let list = [...this.state.list];
    list = list.filter((ele) => ele.id !== Id);
    this.setState({ list });
  };

  render() {
    let data = (
      <div className="saveContainer">
        {this.state.list.map((ele) => (
          <React.Fragment>
            <div
              id={"card-" + ele.id}
              key={"card-" + ele.id}
              className="savedCards"
              selected={true}
            >
              <div id="savedRegez" className="container">
                <span>{ele.regexName}</span>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/regex-query-tool.appspot.com/o/delete%20(1).png?alt=media&token=36d6a099-829d-4540-80a1-7254a0f7d796"
                  className="trashIcon"
                  onClick={() => this.deleteRecord(ele.id)}
                ></img>
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
