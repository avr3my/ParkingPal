// import styles
import "./App.css";

// import libraries and react
import { Route, Routes } from "react-router-dom";

// import pages
import Account from "./pages/Account";
import Home from "./pages/home/Home";

// import components
import Nav from "./components/nav/Nav";


export default function App() {
  return (
    <div className="main-div dark">
      <div className="wide-screen">
        <Nav />
        <div className="routes">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
