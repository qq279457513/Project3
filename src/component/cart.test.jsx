import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Cart from "./cart";
import authContext from "../authContext";

test("when checkout, global invoice number should increase 1", () => {
  const jsdomAlert = window.alert;
  window.alert = () => {};
  const component = renderer.create(<Cart />).getInstance();
  authContext._currentValue.invoiceID =1;
  component.CheckOut();
  expect(authContext._currentValue.invoiceID).toBe(2);
});