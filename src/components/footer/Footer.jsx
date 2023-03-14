// styles
import "./footer.css";

// libraries
import React from "react";
// import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { BsApple } from "react-icons/bs";
import { RiGooglePlayFill } from "react-icons/ri";
import { IconContext } from "react-icons";


export default function Footer() {
  return (
    <footer>
      <div className="left">
        <h4>Contact Us</h4>
        <p className="appStor"></p>
        <p className="appStor"></p>
        <p className="appStor">Address - 770 Eastern Parkway Brooklin n.y</p>
        <p className="appStor">No - +1 7707707</p>
        <p className="appStor">Mail - ParkingPal@Company.il</p>
        <span className="material-symbols-outlined size-icon">call</span>
        {/* <IconContext.Provider value={{ color: "#76b5c5", size: 42 }}> */}
          <FaWhatsapp className="Icons"/>
          <CiTwitter className="Icons" />
          <CiFacebook className="Icons" />
        {/* </IconContext.Provider> */}
      </div>
      <div className="right">
        <h4>Our App</h4>
        <p className="appStor">
          Download our app and get a 15% gift on the first parking
        </p>
        <div className="appStor">
          <RiGooglePlayFill />
          <span>Google Play</span>
        </div>
        <div className="appStor">
          <BsApple />
          <span>Apple Store</span>
        </div>
      </div>
    </footer>
  );
}
