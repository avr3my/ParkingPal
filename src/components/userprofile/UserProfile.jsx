import "./userProfile.css";

import Avatar from "../../Assets/defaultAvatar.png";
import { useState, useEffect } from "react";
import { auth, storage, db } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCamera,
  faPhone,
  faEnvelope,
  faAsterisk,
} from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function UserProfile({ succses }) {
  const [userData, setUserData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [userImage, setUserImage] = useState(Avatar);

  if (!(auth && auth.currentUser)) return;
  const userAuth = auth.currentUser;
  getDoc(doc(db, "users", userAuth.uid))
    .then((e) => {
      setUserData(e.data());
    })
    .catch((err) => console.log("error", err));

  // const updateUserProfile = () => {
  //   updateProfile(auth.currentUser, userData)
  //     .then((e) => console.log("success", e))
  //     .catch((err) => console.log("error", err));
  // };

  const setImage = () => {
    if (!imageUpload) return;
    const imageRef = ref(storage, "users/" + userAuth.uid);
    uploadBytes(imageRef, imageUpload)
      .then((s) => console.log("s"))
      .catch((e) => console.log(e));
  };
  const imageRef = ref(storage, "users/" + userAuth.uid);

  getDownloadURL(imageRef)
    .then((e) => setUserImage(e))
    .catch((e) => console.log(e));
  if (!userData) {
    return;
  }
  return (
    <div className="user-page bg_image">
      <div className="user-profile">
        <div className="image">
          <span className="set-image">
            <i class="fa-solid fa-camera"></i>
          </span>
          <img src={userImage} alt="" />
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <button onClick={setImage}>upload</button> */}
        </div>
        <div className="details">
          <div className="name">
            <div>
              <FontAwesomeIcon icon={faAddressCard} />
              <span> name: </span>
              <span>{userData.name}</span>
            </div>
            <div className="Update-div">
              <button className="Update">Update</button>
            </div>
          </div>
          <div className="phone">
            <div className="">
              <FontAwesomeIcon icon={faPhone} />
              <span> phone: </span>
              <span>{userData.phone}</span>
            </div>
            <div className="Update-div">
              <button className="Update">Update</button>
            </div>
          </div>
          <div className="email">
            <div className="">
              <FontAwesomeIcon icon={faEnvelope} />
              <span> email: </span>
              <span>{userData.email}</span>
            </div>
            <div className="Update-div">
              <button className="Update">Update</button>
            </div>
          </div>
          <div className="desc">
            <div className="">
              <FontAwesomeIcon icon={faAsterisk} />
              <span> Description: </span>
              <b>temporary! </b>
              {userAuth.uid}
            </div>
            <div className="Update-div">
              <button className="Update">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
