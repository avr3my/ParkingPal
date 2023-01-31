import "./login.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login({ setSuccses }) {
  const [signup, setSignup] = useState(false);
  const [failed, setFailed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [show, setShow] = useState("password");

  let handleOnClick = (e) => {
    e.preventDefault();
    setFailed(false);

    let validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!validEmail.test(email)) {
      alert("Invalid email address");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (signup) {
      if (password !== passwordVal) {
        alert("You entered two different passwords");
        return;
      }
      if (!(phone && name)) {
        alert("Missing details");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log("user created:", cred.user);
          addDetails(cred.user.auth.currentUser);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log("user logged in:", cred.user);
          setSuccses(true);
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/user-not-found":
              alert("User doesnt exist");
              break;
            case "auth/wrong-password":
              alert("Wrong password");
              break;

            default:
              alert("Something went wrong");
              console.log(err);
              break;
          }
          setFailed(true);
        });
    }
  };

  let addDetails = (user) => {
    console.log(user);
    updateProfile(user, {
      displayName: name,
      phoneNumber: parseInt(phone),
    })
      .then((user) => {
        setSuccses(true);
        console.log("successugully updated!", user);
      })
      .catch((err) => console.log("failed:", err));
  };

  return (
    <div
      onKeyUpCapture={(e) => {
        if (e.key == "Enter") handleOnClick(e);
      }}
      className="login-page "
    >
      <div className="login-window">
        <span className="close-window material-symbols-outlined">
          <Link to={"/"}>close</Link>
        </span>
        {signup && (
          <div id="name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              autoFocus
            />
          </div>
        )}
        {signup && (
          <div id="phone">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              required
            />
          </div>
        )}
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
        {signup && (
          <div id="password2">
            <input
              type={show}
              min="6"
              placeholder="Reenter password"
              value={passwordVal}
              onChange={(e) => setPasswordVal(e.target.value)}
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
        )}
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
