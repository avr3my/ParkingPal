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
import Error from "./pages/error/Error";

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
        <Route path="/*" element={<Error/>}/>
      </Routes>
      <Footer />
    </div>
  );
}
