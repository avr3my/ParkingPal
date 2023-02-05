import "./userProfile.css";

import Avatar from "../../Assets/defaultAvatar.png";
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function UserProfile({ succses }) {
  const [userData, setUserData] = useState({ ...auth.currentUser });
  const updateUserProfile = () => {
    updateProfile(auth.currentUser, userData)
      .then((e) => console.log(e))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUserData({ ...auth.currentUser });
  }, [succses]);

  if (!userData) {
    return;
  }
  return (
    <div className="user-profile">
      <div className="image">
        <img src={Avatar} alt="" />
      </div>
      <div className="name">
        <span>name: </span>
        <span>{userData.displayName}</span>
      </div>
      <div className="phone">
        <span>phone: </span>
        <span>{userData.phoneNumber}</span>
      </div>
      <div className="email">
        <span>email: </span>
        <span>{userData.email}</span>
      </div>
      <div className="desc"> {userData.uid}</div>
    </div>
  );
}
