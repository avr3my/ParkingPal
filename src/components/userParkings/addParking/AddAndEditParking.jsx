import "./addParking.css";
import Avatar from "../../../Assets/parkingAvatar.jpg";

import { useState, useEffect } from "react";

import Search from "../../search/Search";
import {
  warningPopup,
  successPopup,
  confirmPopup,
  toastSuccess,
  errorPopup,
} from "../../../popup";
import Availability from "./Availability";

// firebase imports
import { auth, storage, db } from "../../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { deleteDoc, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { uploadBytes, deleteObject } from "firebase/storage";

export default function AddAndEditParking({ setAddParking, parkingId }) {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [availabilityWindow, setAvailabilityWindow] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [parkingImage, setParkingImage] = useState(Avatar);
  const [availability, setAvailability] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [parkingInfo, setParkingInfo] = useState(null);

  // get parking info
  useEffect(() => {
    if (!parkingId) {
      setParkingInfo({
        ownerId: auth.currentUser?.uid,
        ownerName: user?.name,
        ownerPhone: user?.phone,
        size: null,
        address: null,
        electicCars: false,
        roofed: false,
        availability: availability,
        occupied: false,
      });
    } else {
      getDoc(doc(db, "parkings", parkingId))
        .then((doc) => {
          setParkingInfo(doc.data());
          setAddress(doc.data().address);
          setAvailability(doc.data().availability);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (!auth.currentUser) return;
    // get user
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((e) => setUser(e.data()))
      .catch((e) => console.log(e));

    // get parking image
    if (!parkingId) return;
    const imageRef = ref(storage, "parkings/" + parkingId);
    getDownloadURL(imageRef)
      .then((e) => setParkingImage(e))
      .catch(() => {});
  }, []);

  // show uploaded image
  useEffect(() => {
    if (imageUpload) setParkingImage(URL.createObjectURL(imageUpload));
  }, [imageUpload]);

  // fixing render address and availability
  useEffect(() => {
    if (address) setParkingInfo({ ...parkingInfo, address: address });
  }, [address]);
  useEffect(() => {
    setParkingInfo({ ...parkingInfo, availability: availability });
  }, [availability]);

  const validateParking = () => {
    if (!user) {
      return false;
    }
    if (!parkingInfo?.ownerName) {
      warningPopup("", "Please enter your name");
      return false;
    }
    if (!parkingInfo.ownerPhone) {
      warningPopup("", "Please enter your phone number");
      return false;
    }
    if (!parkingInfo.size) {
      warningPopup("", "Please enter car size");
      return false;
    }
    if (!parkingInfo.address) {
      warningPopup("", "Select the address");
      return false;
    }
    return true;
  };

  const uploadImage = (parkingId) => {
    if (!imageUpload) return;
    const imageRef = ref(storage, "parkings/" + parkingId);
    uploadBytes(imageRef, imageUpload).catch((e) =>
      console.log("image failure", e)
    );
  };

  const addParking = () => {
    if (!validateParking()) return;
    addDoc(collection(db, "parkings"), parkingInfo)
      .then((e) => {
        user.parkings.push(e.id);
        updateDoc(doc(db, "users", auth.currentUser.uid), {
          parkings: user.parkings,
        });
        uploadImage(e.id);
        successPopup("", "Parking added successufully");
        setAddParking(false);
      })
      .catch((e) => console.log(e));
  };

  const updateParking = () => {
    if (!validateParking()) return;
    updateDoc(doc(db, "parkings", parkingId), parkingInfo)
      .then((e) => {
        uploadImage(parkingId);
        successPopup("", "Parking updated successufully");
        setAddParking(false);
      })
      .catch((e) => console.log(e));
  };

  const deleteParking = async () => {
    let confirmDelete = await confirmPopup(
      "",
      "Are you sure you want to delete this parking?",
      "Delete parking"
    );
    if (!confirmDelete) return;
    deleteDoc(doc(db, "parkings", parkingId))
      .then((e) => {
        toastSuccess("Parking deleted successfully");
        setAddParking(false);
      })
      .catch((e) => {
        errorPopup("", "Failed to delete parking");
        console.log(e);
      });
    deleteObject(ref(storage, "parkings" + parkingId)).catch(() => {});
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      ...user,
      parkings: user.parkings.filter((park) => park !== parkingId),
    });
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
            <span> Owner: </span>
            <input
              type="text"
              value={parkingInfo?.ownerName}
              onChange={(e) =>
                setParkingInfo({ ...parkingInfo, ownerName: e.target.value })
              }
              className="user-detail-input"
            />
          </div>
          <div className="phone">
            <span> Phone: </span>

            <input
              type="text"
              value={parkingInfo?.ownerPhone}
              onChange={(e) =>
                setParkingInfo({ ...parkingInfo, ownerPhone: e.target.value })
              }
              className="user-detail-input"
            />
          </div>
          <div className="car-size">
            <span> Car size: </span>
            <label htmlFor="1"> van </label>
            <input
              type="radio"
              onChange={() => setParkingInfo({ ...parkingInfo, size: 1 })}
              name="parkSize"
              id="1"
              checked={parkingInfo?.size === 1}
            />
            <label htmlFor="2"> minivan </label>
            <input
              type="radio"
              onChange={() => setParkingInfo({ ...parkingInfo, size: 2 })}
              name="parkSize"
              id="2"
              checked={parkingInfo?.size === 2}
            />
            <label htmlFor="3"> full-size </label>
            <input
              type="radio"
              onChange={() => setParkingInfo({ ...parkingInfo, size: 3 })}
              name="parkSize"
              id="3"
              checked={parkingInfo?.size === 3}
            />
          </div>
          <div className="address">
            <span>Address: </span>
            <Search
              src={"parking"}
              setSelectedAddress={setAddress}
              selectedAddress={address}
            />
          </div>
          <div className="features">
            <div>
              <span>Features: </span>
              <label htmlFor="roof">roof </label>
              <input
                checked={parkingInfo?.roofed}
                onChange={(e) =>
                  setParkingInfo({
                    ...parkingInfo,
                    roofed: e.target.checked,
                  })
                }
                type="checkbox"
                name=""
                id="roof"
              />
            </div>
            <div>
              <label htmlFor="elec">electric</label>
              <input
                checked={parkingInfo?.electicCars}
                onChange={(e) =>
                  setParkingInfo({
                    ...parkingInfo,
                    electicCars: e.target.checked,
                  })
                }
                type="checkbox"
                name=""
                id="elec"
              />
            </div>
          </div>
          <div className="time">
            <div className="">Availability:</div>
            <div
              onClick={() => setAvailabilityWindow(true)}
              className="set-availability"
            >
              set
            </div>
            {availabilityWindow && (
              <Availability
                setWindow={setAvailabilityWindow}
                availability={availability}
                setAvailability={setAvailability}
              />
            )}
          </div>
          {(parkingId === null && (
            <button className="parking-btn" onClick={addParking}>
              Add parking
            </button>
          )) || (
            <>
              <button className="parking-btn" onClick={updateParking}>
                Save changes
              </button>
              <button className="parking-btn" onClick={deleteParking}>
                Delete parking
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
