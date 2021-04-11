import React, { Component } from "react";
import "../css/infocard.css";

class InfoCard extends Component {
  state = {
    pattern: this.props.pattern,
    showHid: this.props.showHid,
  };

  componentDidUpdate(prevProps) {
    if (this.props.showHid !== prevProps.showHid) {
      this.setState({ showHid: this.props.showHid });
      this.setState({ pattern: this.props.pattern });
    }
  }

  showHideCard = () => {
    if (this.state.showHid) {
      return "infoCard active";
    } else {
      return "infoCard inactive";
    }
  };
  render() {
    let data = (
      <div className={this.showHideCard()}>
        <p>{String(this.state.pattern)}</p>
      </div>
    );
    return data;
  }
}

export default InfoCard;
