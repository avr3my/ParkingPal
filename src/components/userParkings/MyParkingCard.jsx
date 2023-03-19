import parkingAvatar from "../../Assets/parkingAvatar.jpg";
import "./myParkingCard.css";
import { useEffect, useState } from "react";

import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function MyParkingCard({ parkingId, setParkingId, setAddParking }) {
  const [parkingImg, setParkingImg] = useState(parkingAvatar);
  const [parking, setParking] = useState();
  useEffect(() => {
    getDoc(doc(db, "parkings", parkingId))
      .then((e) => setParking(e.data()))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const imageRef = ref(storage, "parkings/" + parkingId);
    getDownloadURL(imageRef)
      .then((e) => setParkingImg(e))
      .catch(() => {});
  }, [parking]);
  if (!parking) return null;
  return (
    <div
    onClick={() => {
      setParkingId(parkingId);
      setAddParking(true);
    }}
     className="my-parking-card">
      <div className="my-parking-card-img">
        <img
          // src={parkingImg}
          alt={parkingId}
        />
      </div>
      <div className="my-parking-card-info">
        <div className="address">
          {parking.address.properties.address_line1}
          {" "}
          {parking.address.properties.city}
        </div>
      </div>
    </div>
  );
}
