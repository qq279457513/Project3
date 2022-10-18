import React, { Component } from "react";
import authContext from "../authContext";
import { auth, firestore, updateUser } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

class Profile extends Component {
  state = {
    email: authContext._currentValue.email,
    name: authContext._currentValue.name,
    uid: authContext._currentValue.id,
    newName: "",
    isLogin: 0,
  };
  componentDidMount() {
    this.initState();
  }
  componentDidUpdate() {
    this.updateState();
  }
  initState = () => {
    this.setState({
      isLogin: 0,
      email: authContext._currentValue.email,
      name: authContext._currentValue.name,
      uid: authContext._currentValue.id,
    });
  };
  updateState() {
    if (this.state.isLogin === 0 && authContext._currentValue.test === 3) {
      this.setState({ isLogin: 1 });
    }
  }
  render() {
    if (this.state.isLogin === 1) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          let ref = doc(firestore, "users", user.uid);
          getDoc(ref).then((snapshot) => {
            this.setState({
              isLogin: 2,
              email: authContext._currentValue.email,
              name: authContext._currentValue.name,
              uid: authContext._currentValue.id,
            });
          });
        }
      });
    }
    if (this.state.isLogin === 2) {
      return (
        <>
          <h1 className="title">My Profile</h1>
          <div id="profileContainer">
            <div id="nameField">
              <p>User Name: {this.state.name}</p>
              <p>User Email: {this.state.email}</p>
            </div>
            <div id="updateField">
              <form
                className="form-inline"
                action={this.state.url}
                onSubmit={this.handleSubmit}
              >
                <input
                  type="text"
                  value={this.state.value}
                  className="form-control"
                  onChange={this.handleChange}
                ></input>
                <input
                  className="btn btn-secondary"
                  type="submit"
                  value="Update Name"
                ></input>
              </form>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ name: this.state.newName });
    this.setState({ name: this.state.newName });
  };
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ newName: event.target.value });
  };
}

export default Profile;
