import "./userParkings.css"
import { auth, db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import AddAndEditParking from "./addParking/AddAndEditParking";
import { doc, getDoc } from "firebase/firestore";

import MyParkingCard from "./MyParkingCard";

export default function UserParkings() {
  const [addParking, setAddParking] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  const [parkingId, setParkingId] = useState(null);
  const [userParkings, setUserParkings] = useState([])

  useEffect(() => {
    console.log("rendered");
    if (!auth?.currentUser) return;
    getDoc(doc(db, "users", auth.currentUser.uid)).then((e) => {
      setUserParkings(e.data().parkings);
    });
  }, [addParking]);

  return (
    <div className="user-parkings">
      <button
      className="user-parkings-add-parking"
        onClick={() => {
          setParkingId(null);
          setAddParking(true);
        }}
      >
        add parking
      </button>
      {addParking && (
        <AddAndEditParking
          setAddParking={setAddParking}
          parkingId={parkingId}
        />
      )}

      <div className="user-parkings-2">
        {userParkings.map((parking, i) => {
          return (
            <MyParkingCard
              key={i}
              setAddParking={setAddParking}
              setParkingId={setParkingId}
              parkingId={parking}
            />
          );
        })}
      </div>
    </div>
  );
}
