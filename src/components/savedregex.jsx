import React, { Component } from "react";
import "../css/savedregex.css";
import "bootstrap/dist/css/bootstrap.css";
import InfoCard from "./infocard";
import { GlobalStore } from "../index";
import axios from "axios";
import { deleteRegex } from "../store/actions/saveRegex";
import { onClickShowCard, showLoadingIndicator } from "../store/actions/auth";

class SavedRegex extends Component {

  state = {
    list: this.props.list !== undefined ? this.props.list : [],
  };

  componentDidMount = () => {
    // if (this.props.token) {
    //   this.fetchRegex(true, this.props.token);
    // } else {
    //   this.fetchRegex(false);
    // }
  };

  deleteRecord = async (Id) => {
    let list = [...this.state.list];
    list = list.filter((ele) => ele.id !== Id);
    this.props.dispatch(showLoadingIndicator());
    await deleteRegex(this.props.token, Id);
    this.props.dispatch(showLoadingIndicator());
    this.setState({ list });
  };

  onClickShowCard = (dispatch, Id) => {
    // let list = [...this.state.list];
    // for (let item of list) {
    //   if (item.id === Id) {
    //     item.showCard = !item.showCard;
    //   }
    // }
    // this.setState({ list });
    dispatch(onClickShowCard(Id));
  };

  fetchRegex = (show, token = null) => {
    if (show && token) {
      axios
        .post("https://regex-query-tool-backend.herokuapp.com/api/saved", { token: token })
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

  render() {
    let data = (
      <div className="saveContainer" key={"container" + this.props.id}>
        <div className="savedCards" selected={true}>
          <div className="container">
            <GlobalStore.Consumer>
              {(context) => (
                <span
                  title="Click to see regex expression"
                  onClick={() =>
                    this.onClickShowCard(context.dispatch, this.props.id)
                  }
                >
                  {this.props.regexName}
                </span>
              )}
            </GlobalStore.Consumer>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/regex-query-tool.appspot.com/o/trash.png?alt=media&token=23240578-f3af-4741-8c5f-7a4e889f0924"
              className="trashIcon"
              title="Delete regex"
              onClick={this.props.deleteRegex}
              alt="delete icon"
            ></img>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/regex-query-tool.appspot.com/o/edit.png?alt=media&token=d313bcac-f5a2-4613-b63f-d7cf0591967e"
              className="trashIcon"
              title="Dev is lazy to work on this feature, will update soon."
              alt="update icon"
            ></img>
          </div>
        </div>
        <InfoCard
          key={this.props.id}
          pattern={this.props.regexPattern}
          showHid={this.props.showCard}
        />
      </div>
    );
    return data;
  }
}

export default SavedRegex;
