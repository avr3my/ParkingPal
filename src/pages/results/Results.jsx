import "./results.css";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

import { addressContext } from "../../App";
import logo from "../../Assets/logo344.png";

import { sortByDistance } from "../../sort.js";
import ParkingCard from "../../components/parkingCard/ParkingCard";
import "./results.css";
import DarkMood from "../../components/darkMood/DarkMode";

export default function Results() {
  const [selectedAddress, setSelectedAddress] = useContext(addressContext);

  if (selectedAddress && Object.keys(selectedAddress).length !== 0) {
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  } else {
    setSelectedAddress(JSON.parse(localStorage.selectedAddress));
  }

  const [parkings, setParkings] = useState([]);
  const parkingsRef = collection(db, "parkings");
  let address = selectedAddress?.properties;

  useEffect(() => {
    getDocs(parkingsRef).then((res) => {
      let resArr = [];
      res.forEach((doc) => {
        resArr.push(doc);
      });
      // filterResults(resArr);
      sortByDistance(selectedAddress, resArr);
      setParkings(resArr);
    });
  }, []);

  // return;
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
        <DarkMood />
      </div>
      <div className="results-page">
        <div className="address1">
          Parkings around {address.address_line1}
          {", " && address.city}
        </div>
        <div className="results">
          {parkings &&
            parkings.length >= 1 &&
            parkings.map((parking, i) => (
              <ParkingCard key={i} details={parking} />
            ))}
        </div>
      </div>
    </>
  );
}
