import "./home.css";

import imgLogo from "../../Assets/logo344.png";
import Search from "../../components/search/Search";
import { Link } from "react-router-dom";

export default function Home({ selectedAddress, setSelectedAddress }) {
  document.title = "ParkingPal";
  return (
    <>
      <div className="home-page">
        <div className="top">
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
        <Search
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
      </div>
    </>
  );
}
