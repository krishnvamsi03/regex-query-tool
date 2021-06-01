import React, { Component } from "react";

class Patterns extends Component {
  state = {
    matches: this.props.matches,
  };

  componentDidMount = () => {
    // const matches = validateFindRegex();
    // this.setState({ matches: matches });
  };

  render() {
    let data = (
      <div id="popupWindow" className="modals">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Patterns</h4>
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
          <div className="modal-body modalBodyPattern">
            <div className="patternsDiv">
              {this.state.matches.map((match) => (
                <span className="badge bg-info text-wrap text-white">
                  {match}
                </span>
              ))}
            </div>
          </div>
          {/* <div className="modal-footer"></div> */}
        </div>
      </div>
    );
    return data;
  }
}

export default Patterns;
