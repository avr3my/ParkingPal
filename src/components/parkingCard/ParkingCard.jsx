import "./ParkingCard.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdElectricalServices, MdRoofing } from "react-icons/md";

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebaseConfig";

import parkingAvatar from "../../Assets/parkingAvatar.jpg";

export default function ParkingCard({ details }) {
  const [parkingImg, setParkingImg] = useState(parkingAvatar);
  const getImage = () =>{
    if (!details) return;
    const imageRef = ref(storage, "parkings/" + details.id);
    getDownloadURL(imageRef)
      .then((e) => setParkingImg(e))
      .catch(() => {});
  }
  useEffect(getImage, [details]);

  const ElectricCars = (
    <div className="electricCars">
      <span>
        electricCars
        <MdElectricalServices />:{" "}
      </span>
      <div className="green"> </div>
    </div>
  );
  const roofed = (
    <div className="roofed">
      <span>
        roofed
        <MdRoofing />:{" "}
      </span>
      <div className="green"> </div>
    </div>
  );
  const available = (
    <div className="available">
      <span>available: </span>
      <div className="green"> </div>
    </div>
  );
  const noElectricCars = (
    <div className="electricCars">
      <span>
        electricCars
        <MdElectricalServices />:{" "}
      </span>
      <div className="red"> </div>
    </div>
  );
  const noroofed = (
    <div className="roofed">
      <span>
        roofed
        <MdRoofing />:{" "}
      </span>
      <div className="red"> </div>
    </div>
  );
  const noavailable = (
    <div className="available">
      <span>available: </span>
      <div className="red"> </div>
    </div>
  );

  if (!details?.data()) return;

  return (
    <>
      <div className="result">
        <Link className="parking-card-page" to={"/parking/" + details.id}>
          {details.data().available}
          <h1 className="address">
            {details.data().address.properties.address_line1}
            {details.data().address.properties.city}
          </h1>
          <div className="ditels">
            {details.data().available ? available : noavailable}
            {details.data().electricCars ? ElectricCars : noElectricCars}
            {details.data().roofed ? roofed : noroofed}
          </div>
          <div className="imagep">
            <img className="imagep" src={parkingImg} alt="img" />
          </div>
        </Link>
      </div>
    </>
  );
}
