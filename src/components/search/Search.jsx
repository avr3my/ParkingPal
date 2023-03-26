import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import { auth } from "../../firebaseConfig";
import { popupWithCallback } from "../../popup.js";

export default function Search({ src, selectedAddress, setSelectedAddress }) {
  const [searchText, setSearchText] = useState("");
  const [addressResults, setAddressResults] = useState([]);

  const navigate = useNavigate();

  // get auto complete from api
  useEffect(() => {
    var requestOptions = {
      method: "GET",
    };
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=1a18f2e34261449f9b7eeacef064fc9d`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setAddressResults(result.features);
      })
      .catch((error) => console.log("error", error));
  }, [searchText]);

  const handleSelect = (address) => {
    setSelectedAddress(address);
    if (!address?.properties) {
      return;
    }
    // console.log(selectedAddress);
    setSearchText(
      address.properties.address_line1 + ", " + address.properties.city
    );
    navigateToResults();
  };

  useEffect(() => {
    if (src === "parking" && selectedAddress)
      setSearchText(
        selectedAddress.properties.address_line1 +
          ", " +
          selectedAddress.properties.city
      );
  }, [selectedAddress]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Accsess not alowed");
    }
  }

  function showPosition(position) {
    var requestOptions = {
      method: "GET",
    };
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=1a18f2e34261449f9b7eeacef064fc9d`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        handleSelect(result.features[0]);
        // navigateToResults();
      })
      .catch((error) => console.log("error", error));
  }

  const navigateToResults = () => {
    if (src === "parking") return;
    if (!auth.currentUser) {
      popupWithCallback(
        "warning",
        null,
        "You need to login to see parkings",
        () => navigate("/account")
      );
    } else navigate("/parkings-around-me");
  };

  function popup() {
    setTimeout(() => {
      popup.classList.toggle("show");
    }, 1000);
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  return (
    <main>
      <div className="search">
        <div className="input">
          <input
            className="font-input"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter Address Here..."
          />
          {searchText !== "" && (
            <span
              onClick={(e) => setSearchText("")}
              className="delete-search material-symbols-outlined">close</span>
          )}
        </div>
        <button className="popup" onClick={popup}>
          <span className="search-icon material-symbols-outlined">search</span>
          <span className="popuptext" id="myPopup">
            Select address from the list
          </span>
        </button>
      </div>
      <div className="address-results">
        <div className="result" onClick={getLocation}>
          My location
        </div>
        {addressResults?.map((address, i) => (
          <div key={i} className="result" onClick={() => handleSelect(address)}>
            {address.properties.address_line1 +
              ", " +
              address.properties.address_line2}
          </div>
        ))}
      </div>
    </main>
  );
}
