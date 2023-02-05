import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./search.css";

export default function Search({ selectedAddress, setSelectedAddress }) {
  const [searchText, setSearchText] = useState("");
  const [addressResults, setAddressResults] = useState([]);
  useEffect(() => {
    if (searchText === "") {
      setAddressResults([]);
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

  useEffect(() => {
    if (!(selectedAddress && selectedAddress.properties)) {
      return;
    }
    // console.log(selectedAddress);
    let address = selectedAddress.properties;
    setSearchText(address.address_line1 + ", " + address.city);
  }, [selectedAddress]);

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
        setSelectedAddress(result.features[0]);
      })
      .catch((error) => console.log("error", error));
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
              className="delete-search material-symbols-outlined"
            >
              close
            </span>
          )}
        </div>
        <button>
          <Link to={"/parkings-around-me"}>
            <span className="search-icon material-symbols-outlined">
              search
            </span>
          </Link>
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
            onClick={() => setSelectedAddress(address)}
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
