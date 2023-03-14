import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./search.css";
import { auth } from "../../firebaseConfig";
import Swal from "sweetalert2";
import { addressContext } from "../../App";

export default function Search({ src }) {
  const [searchText, setSearchText] = useState("");
  const [addressResults, setAddressResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useContext(addressContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (searchText === "") {
      setAddressResults([]);
      setSelectedAddress(null);
      return;
    }

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
    setSelectedAddress(address)
    if (!(address?.properties)) {
      return;
    }
    // console.log(selectedAddress);
    setSearchText(address.properties.address_line1 + ", " + address.properties.city);
    navigateToResults();
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Accsess not aloud");
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
      Swal.fire({
        icon: "warning",
        title: null,
        text: "You need to login to see parkings",
        confirmButtonColor: "#36899e",
        timer: 2500,
        timerProgressBar: true,
      }).then(() => navigate("/account"));
    } else navigate("/parkings-around-me");
  };

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
              className="delete-search material-symbols-outlined"
            >
              close
            </span>
          )}
        </div>
        <button>
          <span className="search-icon material-symbols-outlined">search</span>
        </button>
      </div>
      <div className="address-results">
        <div className="result" onClick={getLocation}>
          My location
        </div>
        {addressResults.map((address, i) => (
          <div
            key={i}
            className="result"
            onClick={() => handleSelect(address)}
          >
            {address.properties.address_line1 +
              ", " +
              address.properties.address_line2}
          </div>
        ))}
      </div>
    </main>
  );
}
