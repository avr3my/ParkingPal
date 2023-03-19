import "./userParkings.css"
import { auth, db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import AddAndEditParking from "./addParking/AddAndEditParking";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { successPopup } from "../../popup";
import MyParkingCard from "./MyParkingCard";

export default function UserParkings() {
  const [addParking, setAddParking] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [parkingId, setParkingId] = useState(null);

  // console.log(auth?.currentUser);
  useEffect(() => {
    if (!auth?.currentUser) return;
    const userAuth = auth.currentUser;
    getDoc(doc(db, "users", userAuth.uid)).then((e) => {
      setCurrentUser(e);
    });
  }, [auth?.currentUser]);

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
        {currentUser?.data().parkings.map((parking, i) => {
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
