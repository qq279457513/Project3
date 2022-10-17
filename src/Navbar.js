import { Link } from "react-router-dom";
import NavItem from "./component/navItem";
import Authenticate from "./component/authenticate";
import Modal from "./component/Modal";
const Navbar = ({ children }) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <Link to="" className="navbar-brand">
        My Logo
      </Link>
      {/* <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}
      <div className="my-nav">
        <ul className="navbar-nav">{children}</ul>
        <ul className="navbar-nav authenticate">
          <Authenticate />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
