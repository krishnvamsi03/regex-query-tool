import React, { Component } from "react";
import "../css/savedregex.css";
import "bootstrap/dist/css/bootstrap.css";
import InfoCard from "./infocard";

class SavedRegex extends Component {
  state = {
    list: [
      {
        id: 1,
        regexName: "Saved Regex 1",
        showCard: false,
      },
      {
        id: 2,
        regexName: "Saved Regex 2",
        showCard: false,
      },
      {
        id: 3,
        regexName: "Saved Regex 3",
        showCard: false,
      },
      {
        id: 4,
        regexName: "Saved Regex 4",
        showCard: false,
      },
      {
        id: 5,
        regexName: "Saved Regex 5",
        showCard: false,
      },
      {
        id: 6,
        regexName: "Saved Regex 6",
        showCard: false,
      },
      {
        id: 7,
        regexName: "Saved Regex 7",
        showCard: false,
      },
    ],
  };

  deleteRecord = (Id) => {
    let list = [...this.state.list];
    list = list.filter((ele) => ele.id !== Id);
    this.setState({ list });
  };

  onClickShowCard = (Id) => {
    let list = [...this.state.list];
    for (let item of list) {
      if (item.id == Id) {
        item.showCard = !item.showCard;
      }
    }
    this.setState({ list });
  };

  render() {
    let data = (
      <div className="saveContainer" key="save-1">
        {this.state.list.map((ele) => (
          <React.Fragment key={"fragment" + ele.id}>
            <div
              id={"card-" + ele.id}
              key={"card-" + ele.id}
              className="savedCards"
              selected={true}
            >
              <div
                id={"savedRegez" + ele.id}
                key={"savedRegez" + ele.id}
                className="container"
              >
                <span
                  key={"regexname" + ele.id}
                  onClick={() => this.onClickShowCard(ele.id)}
                >
                  {ele.regexName}
                </span>
                <img
                  key={"imagename" + ele.id}
                  src="https://firebasestorage.googleapis.com/v0/b/regex-query-tool.appspot.com/o/trash.png?alt=media&token=23240578-f3af-4741-8c5f-7a4e889f0924"
                  className="trashIcon"
                  title="Delete regex"
                  onClick={() => this.deleteRecord(ele.id)}
                ></img>
                <img
                  key={"imagenameEdit" + ele.id}
                  src="https://firebasestorage.googleapis.com/v0/b/regex-query-tool.appspot.com/o/edit.png?alt=media&token=d313bcac-f5a2-4613-b63f-d7cf0591967e"
                  className="trashIcon"
                  title="Edit Regex"
                ></img>
              </div>
            </div>
            <InfoCard
              key={ele.id}
              pattern={ele.regexName}
              showHid={ele.showCard}
            />
          </React.Fragment>
        ))}
      </div>
    );
    return data;
  }
}

export default SavedRegex;
