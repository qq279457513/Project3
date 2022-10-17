import React, { Component } from "react";

class InputText extends Component {
  state = {
    value: "",
    url:"#",
  };
  render() {
    return (
      <React.Fragment>
        <p>Hello {this.state.value}</p>
        <form action={this.state.url} onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
        <div>
          <p>hello</p>
          <button>Join Membership</button>
        </div>
      </React.Fragment>
    );
  }

  handleSubmit = (event) => {
    let newUrl = "/" + this.state.value;
    console.log(newUrl);
    this.setState({url: newUrl});
    // event.preventDefault();
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
}

export default InputText;
