import "./login.css";

import { useState } from "react";

import { Link } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";
import { errorPopup, warningPopup, successPopup } from "../../popup";

export default function Login({ setSuccses }) {
  const [signup, setSignup] = useState(false);
  const [forgot, setForgot] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const inputIsValid = () => {
    let validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!validEmail.test(email)) {
      warningPopup(null, "Invalid Email Address");
      return false;
    }
    if (password.length < 6) {
      warningPopup(
        "Invalid Password",
        "Password must be at least 6 characters"
      );
      return false;
    }
    return true;
  };

  const registerToFirebase = () => {
    if (password !== passwordVal) {
      warningPopup("Verification Failed", "Passwords are not the same");
      return;
    }
    if (!name) {
      warningPopup("Missing details", "Please enter name");
      return;
    }
    if (!phone || isNaN(phone)) {
      warningPopup("Missing details", "Invalid phone number");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        addUserToCollection(cred.user.auth.currentUser);
      })
      .catch((err) => {
        errorPopup("Failed", "Failed to create an account");
        console.log(err.message);
      });
  };

  const loginToFirebase = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        setSuccses(true);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
            errorPopup("Login Failed", "User does not exist");
            break;
          case "auth/wrong-password":
            errorPopup("Login Failed", "Wrong password");
            break;

          default:
            errorPopup("Login Failed", "Something went wrong");
            console.log(err);
            break;
        }
      });
  };

  const resetPassword = () => {
    let validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!validEmail.test(email)) {
      warningPopup(null, "Invalid Email Address");
      return false;
    }
    const actionCodeSettings = {
      url: 'http://localhost:3000/account',
      handleCodeInApp: true,
    };
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then((e) => {
        successPopup("Successfully Reset", "Check your email and reset password");
        setForgot(false);
        setSignup(false);
        setPassword("")
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found"){
          warningPopup("Reset Failed", "User does not exist")
        }
        else{
          warningPopup("Reset Failed", "Something went wrong")
        }
        console.log(err)});
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    if (forgot) {
      resetPassword();
      return;
    }
    if (!inputIsValid()) {
      return;
    }
    if (signup) registerToFirebase();
    else loginToFirebase();
  };

  const addUserToCollection = (user) => {
    setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      phone: phone,
      parkingOwner: false,
      parkings: null,
      desc: "",
      fav: null,
    })
      .then((e) => setSuccses(true))
      .catch((e) => console.log(e));
  };

  return (
    <div
      onKeyUpCapture={(e) => {
        if (e.key === "Enter") handleOnClick(e);
      }}
      className="login-page "
    >
      <div className="login-window">
        <span className="close-window material-symbols-outlined">
          <Link to={"/"}>close</Link>
        </span>
        {forgot && <span>Enter your email to reset password</span>}

        {signup && (
          <div id="name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
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
              placeholder="Phone Number"
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
        {!forgot && (
          <div id="password">
            <input
              type={show ? "text" : "password"}
              min="6"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={(e) => setShow(!show)}
              className="show-password material-symbols-outlined "
            >
              {show ? "visibility_off" : "visibility"}
            </span>
          </div>
        )}
        {signup && (
          <div id="password2">
            <input
              type={show2 ? "text" : "password"}
              min="6"
              placeholder="Re-type Password"
              value={passwordVal}
              onChange={(e) => setPasswordVal(e.target.value)}
              required
            />
            <span
              onClick={(e) => setShow2(!show2)}
              className="show-password material-symbols-outlined "
            >
              {show2 ? "visibility_off" : "visibility"}
            </span>
          </div>
        )}
        <button onClick={handleOnClick}>
          {forgot ? "Send password" : signup ? "Sign up" : "Login"}
        </button>
        <div className="login-signup">
          <span
            onClick={() => {
              setSignup(forgot ? false : !signup);
              setForgot(false);
            }}
          >
            {forgot || signup ? "Login" : "Create account"}
          </span>

          {!signup && !forgot && (
            <span style={{ textDecoration: "none" }}>•</span>
          )}
          {!signup && !forgot && (
            <span
              onClick={() => {
                setForgot(true);
                setSignup(false);
              }}
            >
              Forgot password?
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
