import "./nav.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import logo from "../../Assets/logo344.png";
import DarkMode from "../darkMode/DarkMode";

export default function Nav({ current, setCurrent }) {
  const [open, setOpen] = useState(false);
  const logout = () => {
    signOut(auth);
  };
  return (
    <nav>
      <Link to={"/"}>
        <img title="ParkingPal" className="logo" src={logo} alt="logo" />
      </Link>
      <span
        className="material-symbols-outlined burger"
        onClick={() => setOpen(!open)}
      >
        {open ? "close" : "menu"}
      </span>
      <div className={`nav-menu ${open ? "open" : ""}`}>
        <div
          onClick={() => {
            setOpen(false);
            setCurrent(1);
          }}
          className={current === 1 ? "selected" : ""}
        >
          {open && (
            <span className="material-symbols-outlined on-side">
              account_circle
            </span>
          )}
          My profile
        </div>
        <div
          onClick={() => {
            setOpen(false);
            setCurrent(2);
          }}
          className={current === 2 ? "selected" : ""}
        >
          {open && (
            <span className="material-symbols-outlined on-side">Favorite</span>
          )}
          Saved parkings
        </div>
        <div
          onClick={() => {
            setOpen(false);
            setCurrent(3);
          }}
          className={current === 3 ? "selected" : ""}
        >
          {open && (
            <span className="material-symbols-outlined on-side">local_parking</span>
          )}
          My parkings
        </div>
        {open && <div className="line"></div>}
        <Link className="logout" onClick={logout} to={"/"}>
          <span
            onClick={logout}
            title="log out"
            className="material-symbols-outlined logout"
          >
            logout
          </span>
          {open && <span onClick={logout} className="on-side logout">Log out</span>}
        </Link>
        <DarkMode />
        <div className="pseudo" ></div>
      </div>
    </nav>
  );
}
