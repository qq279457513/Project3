import React, { Component } from "react";

class PostButton extends Component {
  render() {
    return (
      <button onClick={this.getPost} id={this.props.id}>
        Post
      </button>
    );
  }

  getPost = (event) => {
    console.log("hello");
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "Post",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };
}

export default PostButton;
