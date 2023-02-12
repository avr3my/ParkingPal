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
import Results from "./pages/results/Results";
import Error from "../src/pages/error/Error";
import ParkingPage from "./pages/parkingPage/ParkingPage";

export default function App() {
  const [selectedAddress, setSelectedAddress] = useState({});

  return (
    <div className="main-div light-mode">
      <Routes>
        <Route
          exact path="/"
          element={
            <Home
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          }
        />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/parkings-around-me" element={<Results selectedAddress={selectedAddress}/>} />
        <Route exact path="/parking/:parkingId" element={<ParkingPage/>}/>
        <Route path="/*" element={<Error/>}/>
      </Routes>
      <Footer />
    </div>
  );
}
