import { from } from "form-data";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ParkingCard.css";
import { MdElectricalServices, MdRoofing } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import img from "../../Assets/logo344.png";

export default function ParkingCard({ details }) {
  useEffect(() => {
    // console.log(details.id + ":", details.data());
  }, []);
  const ElectricCars = (
    <div className="electricCars">
      <span>
        electricCars
        <MdElectricalServices />:{" "}
      </span>
      <div className="green"> </div>
    </div>
  );
  const roofed = (
    <div className="roofed">
      <span>
        roofed
        <MdRoofing />:{" "}
      </span>
      <div className="green"> </div>
    </div>
  );
  const available = (
    <div className="available">
      <span>available: </span>
      <div className="green"> </div>
    </div>
  );
  const noElectricCars = (
    <div className="electricCars">
      <span>
        nut electricCars
        <CgUnavailable />:{" "}
      </span>
      <div className="red"> </div>
    </div>
  );
  const noroofed = (
    <div className="roofed">
      <span>
        nut roofed
        <CgUnavailable />:{" "}
      </span>
      <div className="red"> </div>
    </div>
  );
  const noavailable = (
    <div className="available">
      <span>
        nut available <CgUnavailable />:{" "}
      </span>
      <div className="red"> </div>
    </div>
  );

  return (
    <>
      <div className="result">
        <Link className="result-page" to={"/parking/" + details.id}>
          {details.data().available}
          <h1 className="address">
            {details.data().address.properties.address_line1}
            {details.data().address.properties.city}
          </h1>
          <div className="ditels">
            {details.data().available ? available : noavailable}
            {details.data().electricCars ? ElectricCars : noElectricCars}
            {details.data().roofed ? roofed : noroofed}
            <div className="xxx">
              <p>text</p>
              <CgUnavailable />
            </div>
          </div>
          <div className="imagep">
            <img
              className="imagep"
              src="https://harish24.co.il/wp-content/uploads/2019/03/%D7%97%D7%A0%D7%99%D7%94.jpeg"
              alt="img"
            />
          </div>
        </Link>
      </div>

    </>
  );
}
