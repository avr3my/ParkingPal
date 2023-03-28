import "./home.css";

import { Link } from "react-router-dom";

import { addressContext } from "../../App";
import DarkMode from "../../components/darkMode/DarkMode";
import imgLogo from "../../Assets/logo344.png";
import Search from "../../components/search/Search";
import { useContext } from "react";

export default function Home() {
  document.title = "ParkingPal";
  const [address, setAddress] = useContext(addressContext);
  return (
    <>
      <div className="home-page">
        <div className="top">
          <div className="tow">
            <div className="logo">
              <img className="logo-size" src={imgLogo} alt="logo" />
            </div>
          <DarkMode />
            <div title="Account" className="account">
              <Link to={"/account"}>
                <span className="material-symbols-outlined size-icon">
                  account_circle
                </span>
              </Link>
            </div>
          </div>
        </div>
        <Search selectedAddress={address} setSelectedAddress={setAddress} />
      </div>
    </>
  );
}
