import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import "./ParkingPage.css";
import { MdElectricalServices, MdRoofing } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo344.png";
import DarkMood from "../../components/darkMood/DarkMode";
import img from "../../Assets/parkingImg6.png";
import { BsHeartFill } from "react-icons/bs";

export default function ParkingPage() {
  // let img="../../Assets/parkingImg.png";
  const { parkingId } = useParams();
  let parkingRef = doc(db, "parkings", parkingId);
  // getDoc(parkingRef).then(e=>console.table(e.data())).catch(e=>console.log(e))
  const [heart, setheart] = useState("nut-Like");
  const time = "9:00-20:00";
  const Address = "משה ברזני 20 תל אביב";
  const price = "12";
  function save() {
    heart === "nut-Like" ? setheart("Like") : setheart("nut-Like");
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
        <DarkMood />
      </div>
      <div className="ParkingPage">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="information sticky text">
          <h1>{Address}</h1>
          <div className="Details1">
            <div className="Details">
              <div className="left">
                <div className="electricCars">
                  <p>electricCars: </p>
                  <span className="material-symbols-outlined green">done</span>
                </div>
                <div className="roofed">
                  <p>roofed: </p>
                  <span className="material-symbols-outlined green">done</span>
                </div>
                <div className="available">
                  <p>available: </p>
                  <span className="material-symbols-outlined red">close</span>
                </div>
                <div className="price">
                  <p>price: {price} </p>
                  <span className="material-symbols-outlined">
                    attach_money
                  </span>
                </div>
              </div>
              <div className="right">
                <h3>Activity time:</h3>
                <p>Sunday: {time}</p>
                <p>Monday: {time}</p>
                <p>Tuesday: {time}</p>
                <p>Wednesday: {time}</p>
                <p>Thursday: {time}</p>
                <p>Friday: {time}</p>
                <p>Saturday {time}</p>
              </div>
            </div>
            <div onClick={() => save()} className={`saved ${heart}`}>
              <BsHeartFill />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
