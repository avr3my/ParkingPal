//bootsrap
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faMoon, faRocket } from "@fortawesome/free-solid-svg-icons";
// import styles
import "./App.css";

// import libraries and react
import { Route, Routes } from "react-router-dom";
import { createContext, useReducer, useState } from "react";
// import { useEffect, useState } from "react";

// import pages
import Account from "./pages/account/Account";
import Home from "./pages/home/Home";
import Footer from "../src/components/footer/Footer";

// import components
// import { auth } from "./firebaseConfig";
import Results from "./pages/results/Results";
import Error from "../src/pages/error/Error";
import ParkingPage from "./pages/parkingPage/ParkingPage";
export const addressContext = createContext();
export const themeContext = createContext();

export default function App() {
  const [selectedAddress, setSelectedAddress] = useState({});
  const reducer = (state) => (state === "light" ? "dark" : "light");

  const [theme, changeTheme] = useReducer(reducer, "light");
  return (
    <themeContext.Provider value={{ theme, changeTheme }}>
      <addressContext.Provider value={useState({})}>
        <div className={`main-div ${theme}-mode`}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              }
            />
            <Route exact path="/account" element={<Account />} />
            <Route
              exact
              path="/parkings-around-me"
              element={<Results selectedAddress={selectedAddress} />}
            />
            <Route exact path="/parking/:parkingId" element={<ParkingPage />} />
            <Route path="/*" element={<Error />} />
          </Routes>
          <Footer />
        </div>
        {console.log(theme)};
      </addressContext.Provider>
    </themeContext.Provider>
  );
}
