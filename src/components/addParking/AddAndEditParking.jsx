import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, storage, db } from "../../firebaseConfig";
import {
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import Search from "../search/Search";
import { errorPopup, warningPopup, successPopup } from "../../popup";
import Avatar from "../../Assets/parkingAvatar.jpg";
import "./addParking.css";

export default function AddAndEditParking({ setAddParking, parkingId }) {
  const { log } = console;
  let basicStyle = {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  };
  const roofRef = useRef(null);
  const elecRef = useRef(null);
  const [user, setUser] = useState(null);
  const [carSize, setCarSize] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [availability, setAvailability] = useState({});

  const [imageUpload, setImageUpload] = useState(null);
  const [parkingImage, setParkingImage] = useState(Avatar);
  const [renderImage, setRenderImage] = useState(false);

  useEffect(() => {
    // get curren user
    if (!auth.currentUser) return;
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((e) => setUser(e.data()))
      .catch((e) => console.log(e));
  }, []);

  const uploadImage = (parkingId) => {
    if (!imageUpload) return;
    const imageRef = ref(storage, "parkings/" + parkingId);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        console.log("image uploaded");
        setRenderImage(!renderImage);
      })
      .catch((e) => console.log("image failure", e));
  };

  useEffect(() => {
    // get image from storage
    if (!parkingId) return;
    if (!(auth && auth.currentUser)) return;
    const imageRef = ref(storage, "parkings/" + parkingId);
    getDownloadURL(imageRef)
      .then((e) => setParkingImage(e))
      .catch(() => {});
  }, [auth.currentUser, renderImage]);

  const validateParking = () => {
    if (!user) {
      return false;
    }
    if (!carSize) {
      warningPopup("", "Please enter car size");
      return false;
    }
    if (!address) {
      warningPopup("", "Select the address");
      return false;
    }
    if (!user.name) {
      warningPopup("", "Please enter your name");
      return false;
    }
    if (!user.phone) {
      warningPopup("", "Please enter your phone number");
      return false;
    }
    return true;
  };
  const addParking = () => {
    if (!validateParking()) return;
    addDoc(collection(db, "parkings"), {
      ownerId: auth.currentUser.uid,
      ownerName: user.name,
      ownerPhone: user.phone,
      size: carSize,
      address: address,
      electicCars: elecRef.current.checked,
      roofed: roofRef.current.checked,
      availability: null,
      available: false,
      occupied: false,
    })
      .then((e) => {
        user.parkings.push(e.id);
        updateDoc(doc(db, "users", auth.currentUser.uid), {
          parkings: user.parkings,
        });
        uploadImage(e.id);
        successPopup("", "Parking added succesufully");
        setAddParking(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="add-parking-page">
      <div className="add-parking">
        <i
          onClick={() => setAddParking(false)}
          className="fa-close fa-solid"
        ></i>
        <div className="image-div">
          <label htmlFor="file">
            <span className="set-image">
              <i className="fa-solid fa-camera"></i>
            </span>
            <img src={parkingImage} alt="" />
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
        </div>
        <div className="details">
          <div className="name">
            <span> Owner Name: </span>
            {user && (
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="user-detail-input"
              />
            )}
          </div>
          <div className="phone">
            <span> Phone: </span>
            {user && (
              <input
                type="text"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="user-detail-input"
              />
            )}
          </div>
          <div className="car-size">
            <span> Car size: </span>
            <label htmlFor="1"> van </label>
            <input
              type="radio"
              onClick={(e) => setCarSize(1)}
              name="parkSize"
              id="1"
            />
            <label htmlFor="2"> minivan </label>
            <input
              type="radio"
              onClick={(e) => setCarSize(2)}
              name="parkSize"
              id="2"
            />
            <label htmlFor="3"> full-size </label>
            <input
              type="radio"
              onClick={(e) => setCarSize(3)}
              name="parkSize"
              id="3"
            />
          </div>
          <div className="address">
            <span>address: </span>
            <Search
              selectedAddress={address}
              setSelectedAddress={setAddress}
              src={"parking"}
            />
          </div>
          <div className="features">
            <div>
              <label htmlFor="roof">roof </label>
              <input ref={roofRef} type="checkbox" name="" id="roof" />
            </div>
            <div>
              <label htmlFor="elec">electric</label>
              <input ref={elecRef} type="checkbox" name="" id="elec" />
            </div>
          </div>
          <div className="time">
            <div className="open">open</div>

          </div>
          <button className="add-btn" onClick={addParking}>
            add parking
          </button>
        </div>
      </div>
    </div>
  );
}
