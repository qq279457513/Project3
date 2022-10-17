import React, { createContext } from "react";

const authContext = createContext({
  invoiceID:0,
  init: 1,
  allBooks: [],
  cart: [],
  orderHistory: [],
  totalQty: 0,
  name: null,
  email: null,
  id: null,
  cId: 0,
  test: 1,
  setUser: (auth) => {},
});


export default authContext;
