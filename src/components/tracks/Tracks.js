import React, { Component } from "react";
import { Consumer } from "../../context.js";
export default class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          console.log(value);
          return <h1>Hi</h1>;
        }}
      </Consumer>
    );
  }
}
