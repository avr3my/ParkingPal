import "./results.css";
import logo from "../../Assets/logo344.png";

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { addressContext } from "../../App";
import { sortByDistance } from "../../sort.js";
import { isAvailable } from "../../otherFunctions";

import ParkingCard from "../../components/parkingCard/ParkingCard";
import DarkMode from "../../components/darkMode/DarkMode";

export default function Results() {
  const goHome = useNavigate();
  const [selectedAddress, setSelectedAddress] = useContext(addressContext);

  useEffect(() => {
    if (selectedAddress && Object.keys(selectedAddress).length !== 0) {
      sessionStorage.setItem(
        "selectedAddress",
        JSON.stringify(selectedAddress)
      );
    } else if (sessionStorage.selectedAddress === undefined) {
      goHome("/");
    } else {
      setSelectedAddress(JSON.parse(sessionStorage.selectedAddress));
    }
  }, []);

  const [parkings, setParkings] = useState([]);
  const parkingsRef = collection(db, "parkings");
  let address = selectedAddress?.properties;

  useEffect(() => {
    getDocs(parkingsRef).then((res) => {
      let resArr = [];
      res.forEach((doc) => {
        if (isAvailable(doc.data())) resArr.push(doc);
      });
      sortByDistance(selectedAddress, resArr);
      setParkings(resArr);
    });
  }, []);

  // return;
  if (!selectedAddress) {
    return;
  }
  return (
    <>
      <div className="top-parking-page">
        <Link className="logo" to={"/"}>
          <img
            title="ParkingPal"
            className="ParkingPage-logo"
            src={logo}
            alt="logo"
          />
        </Link>
        <DarkMode />
      </div>
      <div className="results-page">
        <div className="address1">
          Parkings around {address.address_line1}
          {", " && address.city}
        </div>
        <div className="results">
          {parkings?.map(
            (parking, i) => i < 20 && <ParkingCard key={i} details={parking} />
          )}
        </div>
      </div>
    </>
  );
}
