import React, { Component } from "react";
import Modal from "./Modal";
import { logout } from "../firebase";
import authContext from "../authContext";
import { auth } from "../firebase";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

class Authenticate extends Component {
  state = {
    show: false,
    type: "",
    showSignUp: false,
    showLogin: true,
    showLogout: true,
    islogin: false,
    test: authContext._currentValue.test,
  };
  render() {
    if (!this.state.islogin) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            islogin: true,
            test: authContext._currentValue.test,
          });
        }
      });
    }
    if (this.state.test == 3) {
      return (
        <React.Fragment>
          <li>
            <Link to={"/Cart"}>
              <button className="navbar-item nav-link" id="cart">
                <BsFillCartFill size="30px" />
              </button>
            </Link>
          </li>
          <li className="navbar-item nav-link">
            <Dropdown>
              <Dropdown.Toggle
                className="navbtn "
                id="user"
                style={{ border: "none" }}
              >
                Me
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={"/Profile"} className="dropdown_link">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={"/History"}>
                  History
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="navbar-item nav-link">
            <Link to={""}>
              <button className="navbtn" id="logout" onClick={this.logOut}>
                Log Out
              </button>
            </Link>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <li className="navbar-item nav-link " id="signup">
            <button className="navbtn" onClick={this.signUpModal}>
              Sign Up
            </button>
          </li>
          <li className="navbar-item nav-link" id="login">
            <button className="navbtn" onClick={this.logInModal}>
              Log In
            </button>
          </li>
          {/* <li className="navbar-item nav-link" id="logout">
            <button className="navbtn" onClick={this.logOut}>
              Log Out
            </button>
          </li> */}
          <Modal
            onClose={this.showModal}
            show={this.state.show}
            name={this.state.type}
            setState={(s, c) => {
              this.setState(s, c);
            }}
          />
        </React.Fragment>
      );
    }
  }
  signUpModal = () => {
    this.setState({
      type: "signup",
      show: true,
    });
  };
  logInModal = () => {
    this.setState({
      type: "login",
      show: true,
    });
  };
  logOut = () => {
    alert("logout");
    authContext._currentValue.test = 1;
    authContext._currentValue.cart = [];
    authContext._currentValue.orderHistory = [];
    authContext._currentValue.name = null;
    authContext._currentValue.email = null;
    authContext._currentValue.id = null;
    authContext._currentValue.cId = 0;
    this.setState({ islogin: false, test: 1 });
    logout();
  };

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
}

export default Authenticate;
