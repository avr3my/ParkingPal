import { useEffect } from "react";
import { db } from "../../firebaseConfig";
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
  getDoc,
} from "firebase/firestore";

export default function Results({ selectedAddress }) {
  if (Object.keys(selectedAddress).length !== 0) {
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  } else {
    selectedAddress = JSON.parse(localStorage.selectedAddress);
  }

  const parkingsRef = collection(db, "parkings");
  console.log(selectedAddress);
  let parkings = [];
  async function func() {
   getDocs(parkingsRef).then(querySnapshot=>
    {querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    })})
  }

  updateDoc(doc(db, parkingsRef, "V2UpAParn0nasB02v0de"), {
    address: selectedAddress,
  })
    .then((s) => console.log(s, "succses"))
    .catch((e) => console.log(e));
  // func();
  async function addParking() {
    await addDoc(parkingsRef, {
      address: selectedAddress,
      roofed: false,
      electricCharger: false,
      available: true,
      boring: "i guess",
      bla: "yes",
    });
  }

  const q = query(parkingsRef, where("id", "==", "current user id"), orderBy('some order(key in item  (optional)' ))
  return <div>Results</div>;
}
