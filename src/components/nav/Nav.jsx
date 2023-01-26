import "./nav.css";
import React from "react";

export default function Nav() {
  return (
    <nav className="open">
      <div className="open-nab-btn">
        <span class="material-symbols-outlined">menu</span>
      </div>
      <div className="account">
        <span class="material-symbols-outlined">account_circle</span>
        <span>My account</span>
      </div>
      <div className="parkings">
        <span class="material-symbols-outlined">local_parking</span>
      <span>parking</span>
      </div>
      <div className="about">
        <span class="material-symbols-outlined">help</span>
      <span>About</span>
      </div>
    </nav>
  );
}
