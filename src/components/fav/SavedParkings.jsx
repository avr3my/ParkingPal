import { useEffect, useState } from "react";

import { logError } from "../../otherFunctions";

import { auth, db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

import ParkingCard from "../parkingCard/ParkingCard";

export default function SavedParkings() {
  const [parkings, setParkings] = useState([]);
  useEffect(() => {
    if (!auth?.currentUser) return;
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((e) => {
        setParkings(e.data().fav);
      })
      .catch((e) => logError(e));
  }, []);
  
  return (
    <div>
      {parkings.map((parking, index) => (
        <SavedParking parkingId={parking} key={index} />
      ))}
    </div>
  );
}

const SavedParking = ({ parkingId }) => {
  const [parkingData, setParkingData] = useState(null);
  useEffect(() => {
    getDoc(doc(db, "parkings", parkingId)).then((e) => setParkingData(e));
  }, [])
  return <ParkingCard details={parkingData} />;
};
