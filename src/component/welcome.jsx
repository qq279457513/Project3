import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyQuote from "./myQuote";


class Welcome extends Component {
  render() {
    return (
      <React.Fragment>
        <p id="welcomeFont" style={{ textAlign: "center" }}>Welcome to my shop.</p>
        <MyQuote />
      </React.Fragment>
    );
  }
}

export default Welcome;
