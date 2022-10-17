import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import NavItem from "./component/navItem";
import { BrowserRouter as Router } from "react-router-dom";

test("navbar test", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
  screen.debug();
});
