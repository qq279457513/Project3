import React from "react";
import { render, screen, queryByAttribute } from "@testing-library/react";
import renderer from "react-test-renderer";
import authContext from "../authContext";
import Profile from "./profile";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { BsJustifyLeft } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";


test("update username", () => {
  const component = renderer.create(<Profile />).getInstance();
  authContext._currentValue.test=2;
  component.state.name = "randel@gmail.com";
  component.state.uid = "xxx";
  component.state.email = "randel@gmail.com";
  
  //   expect(screen.getByRole("input", { type: "submit" }).selected).toBe(
  //     true
  //   );
  expect(component.state.isLogin).toBe(0);
});
