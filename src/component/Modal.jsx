import React, { Component } from "react";
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  initUser,
} from "../firebase";
import authContext from "../authContext";

export default class Modal extends React.Component {
  state = {
    id: "",
    pw: "",
    re_pw: "",
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    if (this.props.name == "signup") {
      return (
        <React.Fragment>
          <div id="myModal" className="myModal">
            <div className="modal-content">
              <span className="close" onClick={this.onClose}>
                &times;
              </span>
              <form>
                <div className="container">
                  <label htmlFor="id">
                    <b>Email</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="id"
                    onChange={this.handleChange}
                    required
                  />

                  <label htmlFor="pw">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="pw"
                    onChange={this.handleChange}
                    required
                  />

                  <label htmlFor="re_pw">
                    <b>Repeat Password</b>
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat Password"
                    name="re_pw"
                    onChange={this.handleChange}
                    required
                  />

                  <div className="clearfix">
                    <button
                      type="button"
                      className="cancelbtn"
                      onClick={this.onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={this.handleSignUp}
                      className="signupbtn"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (this.props.name == "login") {
      return (
        <React.Fragment>
          <div id="myModal" className="myModal">
            <div className="modal-content">
              <span className="close" onClick={this.onClose}>
                &times;
              </span>
              <form>
                <div className="container">
                  <label htmlFor="id">
                    <b>Email</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="id"
                    onChange={this.handleChange}
                    required
                  />

                  <label htmlFor="pw">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="pw"
                    onChange={this.handleChange}
                    required
                  />

                  <div className="clearfix">
                    <button
                      type="button"
                      className="cancelbtn"
                      onClick={this.onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={this.handleLogIn}
                      className="signupbtn"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  handleSignUp = (event) => {
    event.preventDefault();
    if (this.comparePassword(this.state.pw, this.state.re_pw)) {
      registerWithEmailAndPassword(this.state.id, this.state.id, this.state.pw);
      initUser();
      this.onClose();
    }
  };
// Return if the repeate password match input password
  comparePassword(str1, str2) {
    if (str1 != str2) alert("Repeat password doesn't match your Password");
    return str1 == str2;
  }

  handleLogIn = (event) => {
    let isLogin = false;
    this.props.setState({ islogin: true, test: 0 });
    alert("submit login");
    isLogin = logInWithEmailAndPassword(this.state.id, this.state.pw);
    this.onClose();
  };
}
