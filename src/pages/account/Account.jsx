// import { Link } from "react-router-dom";
import { useState } from "react";
import Nav from "../../components/nav/Nav";
import UserProfile from "../../components/userprofile/UserProfile";
import SavedParkings from "../../components/parkings/SavedParkings";
import UserParkings from "../../components/parkings/UserParkings";
import Login from "../../components/login/Login";
import "./account.css"
import {auth} from "../../firebaseConfig"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from "firebase/auth";

export default function Account() {
  const [current, setCurrent] = useState(1);
  const [user, setUser] = useState(auth.currentUser)
  const [succses, setSuccses] = useState(Boolean(user))
  // onAuthStateChanged(auth, e=>setUser(auth.currentUser))


  
  return (
    <div className="account-page">
      <Nav  current={current} setCurrent={setCurrent} />
      {current === 1 ? (
        <UserProfile setSuccses={setSuccses} />
      ) : current === 2 ? (
        <SavedParkings />
      ) : (
        <UserParkings />
      )}

      {!succses?<Login setSuccses={setSuccses}/>:null}
    </div>
  );
}
