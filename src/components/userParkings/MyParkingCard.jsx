import "./myParkingCard.css";
import parkingAvatar from "../../Assets/parkingAvatar.jpg";
import { useEffect, useState } from "react";

import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MdElectricalServices, MdRoofing } from "react-icons/md";
import { isAvailable, logError } from "../../otherFunctions";

export default function MyParkingCard({
  parkingId,
  setParkingId,
  setAddParking,
}) {
  const [parkingImg, setParkingImg] = useState(parkingAvatar);
  const [parking, setParking] = useState(null);

  // get parking
  useEffect(() => {
    getDoc(doc(db, "parkings", parkingId))
      .then((e) => setParking(e.data()))
      .catch((e) => logError(e));
  }, [parkingId]);
  
  // get image
  useEffect(() => {
    const imageRef = ref(storage, "parkings/" + parkingId);
    getDownloadURL(imageRef)
      .then((e) => setParkingImg(e))
      .catch(() => {});
  }, [parkingId]);

  useEffect(() => {
    if(parking) updateDoc(doc(db, "parkings", parkingId), parking)
  }, [parking,parkingId])
  

  if (!parking) return null;
  return (
    <div
      className={`my-parking-card ${
        isAvailable(parking)
          ? parking.occupied
            ? "used"
            : ""
          : "not-available"
      } `}
    >
      <div className="my-parking-card-img">
        <img src={parkingImg} alt={parkingId} />
      </div>
      <div className="my-parking-card-info">
        <div className="address">
          {parking.address.properties.address_line1}{" "}
          {parking.address.properties.city}
        </div>
        <div className="my-parking-card-Details">
          <div>
            {parking.electicCars && (
              <div className="electricCars">
                Electric Car
                <MdElectricalServices />
              </div>
            )}
          </div>
          <div>
            {parking.roofed && (
              <div className="roofed">
                roofed
                <MdRoofing />
              </div>
            )}
          </div>
        </div>
      </div>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          setParkingId(parkingId);
          setAddParking(true);
        }}
        style={{ fontSize: "large", cursor: "pointer" }}
      >
        edit
      </span>
      <label className="switch">
        <input
          checked={parking.occupied}
          onChange={(e) =>
            setParking({ ...parking, occupied: e.target.checked })
          }
          type="checkbox"
        />
        <span className={`slider round`}></span>
      </label>
    </div>
  );
}
