import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ParkingCard({ details }) {
  useEffect(() => {
    console.log(details.id + ":", details.data());
  }, []);

  return <Link to={"/parking/" + details.id}>{details.data().available} hello</Link>;
}
