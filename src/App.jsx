// import styles
import "./App.css";

// import libraries and react
import { Route, Routes } from "react-router-dom";
import { useState, createContext, useReducer, useEffect } from "react";

// import pages
import Account from "./pages/account/Account";
import Home from "./pages/home/Home";
import Footer from "../src/components/footer/Footer";

// import components
import Results from "./pages/results/Results";
import Error from "../src/pages/error/Error";
import ParkingPage from "./pages/parkingPage/ParkingPage";
import Admin from "./components/admin/Admin";

// create contexts
export const addressContext = createContext();
export const themeContext = createContext();

export const actionCodeSettings = {
  url: "http://localhost:3000/account",
  handleCodeInApp: true,
};

export default function App() {
  const reducer = (state) => {
    let n = state === "light" ? "dark" : "light";
    localStorage.setItem("theme", n);
    return n;
  };
  const [theme, changeTheme] = useReducer(
    reducer,
    localStorage.getItem("theme") || "light"
  );
  return (
    <themeContext.Provider value={{ theme, changeTheme }}>
      <addressContext.Provider value={useState()}>
        <div className={`main-div ${theme}-mode`}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/parkings-around-me" element={<Results />} />
            <Route exact path="/parking/:parkingId" element={<ParkingPage />} />
            <Route path="/*" element={<Error />} />
            <Route exact path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </addressContext.Provider>
    </themeContext.Provider>
  );
}
