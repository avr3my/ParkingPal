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

export default function App() {
  const [selectedAddress, setSelectedAddress] = useState({});

  return (
    <div className="main-div kight-mode">
      <Routes>
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
