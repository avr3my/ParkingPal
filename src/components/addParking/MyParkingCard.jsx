import parkingAvatar from "../../Assets/parkingAvatar.jpg";
import "./myParkingCard.css";
import { useEffect, useState } from "react";

import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function MyParkingCard({ parkingId }) {
  const [parkingImg, setParkingImg] = useState(parkingAvatar);
  const [parking, setParking] = useState();
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

  useEffect(getImage, [parking]);
  if (!parking) return null;
  return (
    <div className="my-parking-card">
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
          {parking.address.properties.address_line2}
        </div>
      </div>
    </div>
  );
}
