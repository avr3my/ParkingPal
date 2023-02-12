import { useEffect,useState } from "react";
import { db} from "../../firebaseConfig";
// import { db, auth } from "../../firebaseConfig";
import {
  collection,
  // onSnapshot,
  // addDoc,
  // deleteDoc,
  // doc,
  // query,
  // where,
  // orderBy,
  // serverTimestamp,
  // updateDoc,
  // setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
// import tempImage from "../../Assets/logo344.png";
import ParkingCard from "../../components/parkingCard/ParkingCard";

export default function Results({ selectedAddress }) {
  if (Object.keys(selectedAddress).length !== 0) {
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  } else {
    selectedAddress = JSON.parse(localStorage.selectedAddress);
  }

  const [parkings, setParkings] = useState([])
  const parkingsRef = collection(db, "parkings");

  // console.log(selectedAddress);
  useEffect(() => {
    getDocs(parkingsRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ":", doc.data());
        setParkings([...parkings, doc])
      });
    });
  }, [])
  
  // updateDoc(doc(db,"parkings","V2UpAParn0nasB02v0de"),{
  //   ownerId:auth && auth.currentUser?auth.currentUser.uid:null
  // })

  // async function addParking() {
  //   await addDoc(parkingsRef, {
  //     address: selectedAddress,
  //     roofed: false,
  //     electricCharger: false,
  //     available: true,
  //     boring: "i guess",
  //     bla: "yes",
  //   });
  // }

  // const q = query(parkingsRef, where("id", "==", "current user id"), orderBy('some order(key in item  (optional)' ))
  // console.log("parkings", parkings);
  // if (parkings.length !== 0) console.log(parkings);
  return (
    <div>
      {parkings && parkings.map((parking) => {
          return <ParkingCard details={parking} />;
      })}
    </div>
  );
}
