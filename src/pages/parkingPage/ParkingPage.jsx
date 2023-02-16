import React from "react";
import { auth, db } from "../../firebaseConfig"
import { useParams } from "react-router";
import {

    doc, getDoc,
  } from "firebase/firestore";


export default function ParkingPage() {
  const { parkingId } = useParams();
  let parkingRef = doc(db,"parkings",parkingId)
  // getDoc(parkingRef).then(e=>console.table(e.data())).catch(e=>console.log(e))
  
  return <div>ParkingPage</div>;
}
