import React, { Component } from "react";


class Counter extends Component {
  state = {
    counter: 0,
  };

  incrementCounter = () => {
    this.state.counter === 0
      ? this.setState({ counter: this.state.counter + 1 })
      : this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    return (
      <React.Fragment>
        <span className={this.getBadgeClasses()}>{this.state.counter}</span>
        <button
          onClick={this.incrementCounter}
          className="btn btn-primary btn-sm m-2"
        >
          Counter
        </button>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.counter === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
