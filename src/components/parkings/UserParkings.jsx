import { auth, db } from "../../firebaseConfig";

import { useEffect, useState } from "react";
import AddAndEditParking from "../../components/addParking/AddAndEditParking";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { successPopup } from "../../popup";
import MyParkingCard from "../addParking/MyParkingCard";

export default function UserParkings() {
  const [addParking, setAddParking] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // console.log(auth?.currentUser);
  useEffect(() => {
    if (!auth?.currentUser) return;
    const userAuth = auth.currentUser;
    getDoc(doc(db, "users", userAuth.uid)).then((e) => {
      setCurrentUser(e);
    });
  }, [auth?.currentUser]);


  const deleteParking = (parkingId) => {
    if (!parkingId) return;
    deleteDoc(doc(db, "parkings", parkingId))
      .then(() => {
        updateDoc(doc(db, "users", auth.currentUser.uid), {
          parkings: currentUser.parkings.filter(
            (parking) => parking !== parkingId
          ),
        });
        successPopup("", "Parking deleted succesufully");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="user-parkings">
      <h2>my parkings</h2>
      <button onClick={() => setAddParking(true)}>add parking</button>
      {addParking && (
        <AddAndEditParking setAddParking={setAddParking} parkingId={null} />
      )}

      <div className="user-parkings-2">
        {currentUser?.data().parkings.map((parking, i) => {
          // console.log(i);
          return (
              <MyParkingCard key={i} parkingId={parking} />

          );
        })}
      </div>
    </div>
  );
}
