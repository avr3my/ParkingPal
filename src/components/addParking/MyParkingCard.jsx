import parkingAvatar from "../../Assets/parkingAvatar.jpg";
import "./myParkingCard.css";
import { useEffect, useState } from "react";

import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { MdElectricalServices, MdRoofing } from "react-icons/md";

export default function MyParkingCard({ parkingId }) {
  const [mode, setMode] = useState("used");
  const [parkingImg, setParkingImg] = useState(parkingAvatar);
  const [parking, setParking] = useState();
  let available = "available";
  let slider;
  const getImage = () => {
    const imageRef = ref(storage, "parkings/" + parkingId);
    getDownloadURL(imageRef)
      .then((e) => setParkingImg(e))
      .catch(() => {});
  };
  useEffect(() => {
    getDoc(doc(db, "parkings", parkingId))
      .then((e) => setParking(e.data()))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    // available === "available" ? (slider = "slider") : (slider = "nut-slid");
    change();
  }, [available]);

  useEffect(getImage, [parking]);

  if (!parking) return null;

  available === "available" ? (slider = "slider") : (slider = "nut-slid");

  function change() {
    if (available === "available") {
      mode === "not-in-use" ? setMode("used") : setMode("not-in-use");
    } else {
      setMode("not-available");
    }
  }
  let Electric = true;
  let roof = true;

  const ElectricCars = (
    <div className="electricCars">
      <span>
        electricCars
        <MdElectricalServices />{" "}
      </span>
      <div className="green"> </div>
    </div>
  );
  const roofed = (
    <div className="roofed">
      <span>
        roofed
        <MdRoofing />{" "}
      </span>
      <div className="green"> </div>
    </div>
  );
  return (
    <div className={`my-parking-card ${mode}`}>
      {/* <div className="my-parking-card not-available"> */}
      <div className="my-parking-card-img">
        <img
          className="my-parking-card-img1"
          src={parkingImg}
          alt={parkingId}
        />
      </div>
      <div className="my-parking-card-info">
        <div className="address">
          {parking.address.properties.address_line1}{" "}
          {parking.address.properties.address_line2}
        </div>
        <div className="my-parking-card-Details">
          <div>{Electric ? ElectricCars : ""}</div>
          <div>{roof ? roofed : ""}</div>
        </div>
      </div>
      <label className="switch">
        <input type="checkbox" />
        <span onClick={() => change()} className={`${slider} round`}></span>
      </label>
    </div>
  );
}
