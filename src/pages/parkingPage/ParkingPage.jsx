import "./ParkingPage.css";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useParams } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo344.png";
import DarkMood from "../../components/darkMode/DarkMode";
import img from "../../Assets/parkingImg6.png";
import { BsHeartFill } from "react-icons/bs";
import { isAvailable } from "../../otherFunctions";
import {SiWaze, SiGooglemaps} from "react-icons/si"

export default function ParkingPage() {
  const [parking, setParking] = useState(null);
  const { parkingId } = useParams();
  useEffect(() => {
    getDoc(doc(db, "parkings", parkingId)).then((e) => setParking(e.data()));
  }, [parkingId]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((e) => setUser(e.data()))
      .catch((e) => console.log(e));
  }, [user]);

  const setFav = () => {
    let finalArr = user.fav;
    let index = finalArr.indexOf(parkingId);
    if (index === -1) {
      finalArr = user.fav.concat(parkingId);
    } else {
      finalArr.splice(index, 1);
    }
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      ...user,
      fav: finalArr,
    });
  };

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (!parking) return null;
  let c  = parking.address.geometry.coordinates;

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
      <div className="ParkingPage">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="information sticky text">
          {parking && (
            <h1>
              {parking.address.properties.address_line1}
              {", "}
              {parking.address.properties.city}
            </h1>
          )}
          <div className="Details1">
            <div className="Details">
              <div className="left">
                <div className="electricCars">
                  <p>EV Charger: </p>
                  <span className="material-symbols-outlined">
                    {parking.electicCars ? "done" : "close"}
                  </span>
                </div>
                <div className="roofed">
                  <p>roofed: </p>
                  <span className="material-symbols-outlined ">
                    {parking.roofed ? "done" : "close"}
                  </span>
                </div>
                <div className="available">
                  <p>available: </p>
                  <span className="material-symbols-outlined">
                    {!parking.occupied && isAvailable(parking) ? "done" : "close"}
                  </span>
                </div>
              </div>
              <div className="right">
                <h3>Activity time:</h3>
                {weekdays.map((day, index) => {
                  return (
                    <p key={index}>
                      {day}:{" "}
                      {parking.availability[day].map((timeSlot, i) => (i===1 ? ", ":"") + timeSlot.start+"-"+timeSlot.end)}
                    </p>
                  );
                })}
              </div>
            </div>
            <div
              onClick={setFav}
              className={`saved ${user?.fav.includes(parkingId) ? "like" : ""}`}
            >
              <BsHeartFill />
            </div>
          </div>
          <div className="sticky-buttom">
           <a className="navigation-button" target={"_blank"} href={`https://www.waze.com/ul?ll=${c[1]}%2C${c[0]}&navigate=yes&zoom=17`}>waze <SiWaze/></a>
           <a className="navigation-button" target={"_blank"} href={`https://www.google.com/maps/search/?api=1&query=${c[1]}%2C${c[0]}`}>google maps <SiGooglemaps/></a>
           <a className="navigation-button" color="white" target={"_blank"} href={`tel:${parking.ownerPhone}`}>call <i className="fa-solid fa-phone"></i> </a>
        </div>
        </div>
      </div>
    </>
  );
}
