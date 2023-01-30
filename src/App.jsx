// import styles
import "./App.css";

// import libraries and react
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// import pages
import Account from "./pages/account/Account";
import Home from "./pages/home/Home";

// import components
import Nav from "./components/nav/Nav";

import { auth } from "./firebaseConfig";

export default function App() {

  return (
    <div className="main-div light-mode">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/account"
          element={<Account />}
        />
      </Routes>
    </div>
  );
}
