import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import authContext from "../authContext";
import Products from "./products";

test("When user is not log in, render nothing", () => {
  render(<Products />);
  screen.debug();
});
test("When user loged in, render product container", () => {
  const component = renderer.create(<Products />).getInstance();
  authContext._currentValue.init = 0;
  component.updateBooks();
  expect(component.state.init).toBe(2);
  render(<Products />);
  screen.debug();
});
