import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ParkingCard from "../../components/parkingCard/ParkingCard";

export default function Results({ selectedAddress }) {
  if (Object.keys(selectedAddress).length !== 0) {
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  } else {
    selectedAddress = JSON.parse(localStorage.selectedAddress);
  }

  const [parkings, setParkings] = useState([]);
  const parkingsRef = collection(db, "parkings");
  let address = selectedAddress.properties;

  useEffect(() => {
    getDocs(parkingsRef).then((res) => {
      let resArr = [];
      res.forEach(doc => {
        resArr.push(doc);  
      });
      setParkings(resArr); 
    })

  }, []);  

  return (
    <div className="results-page">
      <div className="address">
        Parkings around {address.address_line1}{", " && address.city}
      </div>
      <div className="results">
        {parkings && parkings.length == 1 && 
          parkings.map((parking,i) => (
            <ParkingCard key={i} details={parking} />
          ))}
      </div>
    </div>
  );
}
