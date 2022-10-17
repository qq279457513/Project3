import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import Cart from "./component/cart";
import History from "./component/history";
import Profile from "./component/profile";
import NavItem from "./component/navItem";
import authContext from "./authContext";
import { auth, colRef } from "./firebase";
import { getDocs } from "firebase/firestore";
import "./scss/style";
import Products from "./component/products";

function App() {
  const [foo, setUser] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  return (
    <authContext.Provider value={authContext._currentValue.test}>
      <div className="Mycontainer">
        <Navbar>
          <NavItem name="Home" url="" />
          <NavItem name="Products" url="/Products" />
          <NavItem name="About Me" url="/About" />
       
        </Navbar>

        <Routes>
          <Route path="" element={<Home />} />
          <Route path="Products" element={<Products />} />
          <Route path="About" element={<About />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="History" element={<History />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </div>
      <div className="footer">
        <p>Copyright &copy; 2022 Randel</p>
      </div>
    </authContext.Provider>
  );
}

export default App;
