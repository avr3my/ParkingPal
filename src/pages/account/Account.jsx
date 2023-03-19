import "./account.css"

import Nav from "../../components/nav/Nav";
import UserProfile from "../../components/userprofile/UserProfile";
import SavedParkings from "../../components/parkings/SavedParkings";
import UserParkings from "../../components/userParkings/UserParkings";
import Login from "../../components/login/Login";

import {auth} from "../../firebaseConfig"

import { useState } from "react";

export default function Account() {
  const [current, setCurrent] = useState(1);
  const [user, setUser] = useState(auth.currentUser)
  const [succses, setSuccses] = useState(Boolean(user))


  document.title = "ParkingPal/Account"

  return (
    <div className="account-page">
      <Nav  current={current} setCurrent={setCurrent} />
      {current === 1 ? (
        <UserProfile setSuccses={setSuccses}/>
      ) : current === 2 ? (
        <SavedParkings />
      ) : (
        <UserParkings />
      )}
      
      {!succses?<Login setSuccses={setSuccses}/>:null}
    </div>
  );
}
