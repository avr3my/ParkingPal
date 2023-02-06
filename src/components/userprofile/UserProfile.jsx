import "./userProfile.css";

import Avatar from "../../Assets/defaultAvatar.png";
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard,faCamera,faPhone,faEnvelope,faAsterisk } from '@fortawesome/free-solid-svg-icons'

export default function UserProfile({ succses }) {
  const [userData, setUserData] = useState({ ...auth.currentUser });
  const updateUserProfile = () => {
    updateProfile(auth.currentUser, userData)
      .then((e) => console.log(e))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUserData({ ...auth.currentUser });
    console.log(userData);
  }, [succses]);

  if (!userData) {
    return;
  }
  return (
    <div className="user-page bg_image">
         <div className="user-profile">
      <div className="image">
        <FontAwesomeIcon icon={faCamera} />
        <img src={Avatar} alt="" />
        
      </div>
      <div className="name">
      <div>
      <FontAwesomeIcon icon={faAddressCard}/>
        <span> name: </span>
        <span>{userData.displayName}</span>
      </div>
      <div className="Update-div">
        <button className="Update">Update</button>
      </div>
      </div>
      <div className="phone">
        <div className="">
      <FontAwesomeIcon icon={faPhone}/>
        <span> phone: </span>
        <span>{userData.phoneNumber}</span>
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
         {userData.uid}
        </div>
        <div className="Update-div">
        <button className="Update">Update</button>
      </div>
      </div>
    </div>
    </div>
   
  );
}
