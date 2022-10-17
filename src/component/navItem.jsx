import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

class NavItem extends Component {
  render() {

    return (
      <React.Fragment>
        <li className="navbar-item">
          <Link to={this.props.url} className="nav-link">
            {this.props.name}
          </Link>
        </li>

      </React.Fragment>
    );
  }
}

export default NavItem;
