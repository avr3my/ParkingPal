import "./ParkingCard.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdElectricalServices, MdRoofing } from "react-icons/md";

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebaseConfig";

import parkingAvatar from "../../Assets/parkingAvatar.jpg";

export default function ParkingCard({ details }) {
  const [parkingImg, setParkingImg] = useState(parkingAvatar);

  // get image
  useEffect(() => {
    if (!details) return;
    getDownloadURL(ref(storage, "parkings/" + details.id))
      .then((e) => setParkingImg(e))
      .catch(() => {});
  }, [details]);
  if (!details?.data()) return;
  return (
      <div className="result">
        <Link className="parking-card-page" to={"/parking/" + details.id}>
          {details.data().available}
          <h1 className="address">
            {details.data().address.properties.address_line1}
            {details.data().address.properties.city}
          </h1>
          <div className="details">
            <div className="electricCars">
              <span>
                EV Charger
                <MdElectricalServices />:{" "}
              </span>
              <div className={details.data().electicCars ? "green" : "red"}> </div>
            </div>
            <div className="roofed">
              <span>
                Roofed
                <MdRoofing />:{" "}
              </span>
              <div className={details.data().roofed ? "green" : "red"}> </div>
            </div>
          </div>
          <div className="imagep">
            <img className="imagep" src={parkingImg} alt="img" />
          </div>
        </Link>
      </div>

  );
}
