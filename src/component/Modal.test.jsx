import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Modal from "./Modal";

test("compare password", () => {
  const jsdomAlert = window.alert;
  window.alert = () => {};
  const component = renderer.create(<Modal />).getInstance();
  let pw = "123456";
  let repw = "123456";
  expect(component.comparePassword(pw, repw)).toBe(true);

  repw = "123455";
  expect(component.comparePassword(pw, repw)).toBe(false);
});
