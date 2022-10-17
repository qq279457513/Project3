import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Authenticate from "./authenticate";
import authContext from "../authContext";

test("test authenticate logout function", () => {
  const jsdomAlert = window.alert;
  window.alert = () => {};
  const component = renderer.create(<Authenticate />).getInstance();
  component.logInModal();
  expect(component.state.type).toBe('login');
  expect(component.state.show).toBe(true);

  component.logOut();
  expect(component.state.test).toBe(1);
  expect(authContext._currentValue.id).toBe(null);
});
