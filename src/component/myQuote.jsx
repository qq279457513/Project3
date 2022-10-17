import React, { Component } from "react";

class MyQuote extends Component {
  state = {
    err: null,
    isLoaded: false,
    items: [],
  };
  componentDidMount() {
    fetch(
      "https://api.unsplash.com/users/randel0115/likes/?client_id=FnltszsoqhfmU6HRauxA6kH9NlgQMVgCsKn7t4ncMx0"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state.items[0].urls.small);
      return (
        <React.Fragment>
          <div className="api_img">
            <img src={this.state.items[0].urls.small}></img>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default MyQuote;
