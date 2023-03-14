import "./home.css";

import { Link } from "react-router-dom";

import DarkMood from "../../components/darkMood/DarkMood";
import imgLogo from "../../Assets/logo344.png";
import Search from "../../components/search/Search";

export default function Home() {
  document.title = "ParkingPal";
  return (
    <>
      <div className="home-page">
        <div className="top">
          <div className="tow">
            <div className="logo">
              <img className="logo-size" src={imgLogo} alt="logo" />
            </div>
            <div title="Account" className="account">
              <Link to={"/account"}>
                <span className="material-symbols-outlined size-icon">
                  account_circle
                </span>
              </Link>
            </div>
          </div>
          <DarkMood />
        </div>
        <Search/>
      </div>
    </>
  );
}
