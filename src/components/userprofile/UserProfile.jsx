import "./userProfile.css";

import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function UserProfile({setSuccses}) {
  console.log(auth.currentUser);

  // const [name, setName] = useState(user.displayName);
  // const [email, setEmail] = useState(user.email);
  // const [phone, setPhone] = useState(user.phoneNumber);
  // const [image, setImage] = useState(user.photoURL);
  // const [desc, setDesc] = useState(user.desc);

  const [userData, setUserData] = useState({...auth.currentUser});

  const updateUserProfile = () => {
    updateProfile(auth.currentUser, userData)
      .then((e) => console.log(e))
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    setUserData({...auth.currentUser});
  }, [setSuccses]);

  if (!userData) {
    return;
  }
  return (
    <div className="user-profile">
      <div className="image">image </div>
      <div className="name">
        <span>name</span>
        <input
          value={userData.displayName}
          onChange={(e) =>
            setUserData({ ...userData, displayName: `${e.target.value}` })
          }
          type="text"
        />
      </div>
      <div className="phone">
        <span>phone</span>
        <input
          type="text"
          value={userData.phoneNumber}
          onChange={(e) =>
            setUserData({ ...userData, phoneNumber: `${e.target.value}` })
          }
        />
      </div>
      <div className="email">
        <span>email</span>
        <input
          type="text"
          value={userData.email}
          onChange={(e) =>
            setUserData({ ...userData, email: `${e.target.value}` })
          }
        />{" "}
      </div>
      <div className="desc"> desc</div>
    </div>
  );
}
