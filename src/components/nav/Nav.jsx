import "./nav.css";
import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import logo from "../../Assets/logo344.png";
import DarkMood from "../darkMood/DarkMode";

export default function Nav({ current, setCurrent }) {
  const logout = () => {
    signOut(auth);
  };
  return (
    <div className="nav">
      <nav>
        <Link to={"/"}>
          <img title="ParkingPal" className="logo" src={logo} alt="logo" />
        </Link>
        <div
          onClick={() => setCurrent(1)}
          className={current === 1 ? "selected" : ""}
        >
          My profile
        </div>
        <div
          onClick={() => setCurrent(2)}
          className={current === 2 ? "selected" : ""}
        >
          Saved parkings
        </div>
        <div
          onClick={() => setCurrent(3)}
          className={current === 3 ? "selected" : ""}
        >
          My parkings
        </div>
        <Link to={"/"}>
          <span
            onClick={logout}
            title="log out"
            id="logout"
            className="material-symbols-outlined"
          >
            logout
          </span>
        </Link>
      </nav>
      <DarkMood />
      </div>
  );
}
