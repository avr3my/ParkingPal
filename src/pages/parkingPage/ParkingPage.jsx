import React from "react";
import { auth, db } from "../../firebaseConfig"
import { useParams } from "react-router";
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
    updateDoc,
    setDoc,
    getDocs,
  } from "firebase/firestore";


export default function ParkingPage() {
  const { parkingId } = useParams();
  let parkingRef = doc(db,"parkings","V2UpAParn0nasB02v0de")
  console.log(parkingRef);

  return <div>ParkingPage</div>;
}
