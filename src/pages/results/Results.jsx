import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ParkingCard from "../../components/parkingCard/ParkingCard";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo344.png"
import "./results.css"

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
    <>
    <Link className="logo" to={"/"}>
        <img title="ParkingPal" className="logo" src={logo} alt="logo" />
      </Link>
    <div className="results-page">
      <div className="address">
        Parkings around {address.address_line1}{", " && address.city}
      </div>
      <div className="results">
        {parkings && parkings.length >0 && 
          parkings.map((parking,i) => (
            <ParkingCard key={i} details={parking} />
          ))}
      </div>
    </div>
    </>
  );
}
