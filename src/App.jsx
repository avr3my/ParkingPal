//bootsrap
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMoon, faRocket } from "@fortawesome/free-solid-svg-icons";
// import styles
import "./App.css";

// import libraries and react
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// import pages
import Account from "./pages/account/Account";
import Home from "./pages/home/Home";
import Footer from "../src/components/footer/Footer";

// import components
import { auth } from "./firebaseConfig";
// import {Background} from '../src/components/Background/Background'

export default function App() {
  const [selectedAddress, setSelectedAddress] = useState({});
  library.add(faMoon, faRocket);


  return (
    <div className="main-div light-mode">
      <Routes>
        {/* <Background/> */}
        <Route
          path="/"
          element={
            <Home
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          }
        />
        <Route path="/account" element={<Account />} />
        <Route path="/parkings-around-me" element={null} />
      </Routes>
      <Footer />
    </div>
  );
}
