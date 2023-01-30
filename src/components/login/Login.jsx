import "./login.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login({setSuccses}) {
  const [signup, setSignup] = useState(false);
  const [failed, setFailed] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [shortPassword, setShortPassword] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState("password");


  let handleOnClick = (e) => {
    e.preventDefault();
    setFailed(false);
    setWrongEmail(false);
    setShortPassword(false);


    let validEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(!validEmail.test(email)){
      setWrongEmail(true);
      alert("Invalid email address")
      return;
    }
    if (password.length<6) {
      setShortPassword(true);
      alert("Password must be at least 6 characters")
      return;
    }

    if (signup) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log("user created:", cred.user);
          setSuccses(true);
          console.log(cred.user);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log("user logged in:", cred.user);
          setSuccses(true);
          console.log(cred.user);
        })
        .catch((err) => {
          console.log(err.message);
          setFailed(true);
        });
    }
  };


  return (
    <div onKeyUpCapture={e=>{if(e.key == "Enter") handleOnClick(e)}} className="login-page ">
      <div className="login-window">
        <span className="close-window material-symbols-outlined">
          <Link to={"/"}>close</Link>
        </span>
        <div id="email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoFocus
          />
        </div>
        <div id="password">
          <input
            type={show}
            min="6"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onMouseDown={(e) => setShow("text")}
            onMouseUp={(e) => setShow("password")}
            className="show-password material-symbols-outlined "
          >
            visibility
          </span>
        </div>
        <button onClick={handleOnClick}>{signup ? "Sign up" : "Login"}</button>
        <div className="login-signup">
          <span onClick={() => setSignup(!signup)}>
            {signup ? "Login" : "Create an account"}
          </span>
        </div>
      </div>
    </div>
  );
}
