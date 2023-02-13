import "./login.css";

import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { auth, db } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export default function Login({ setSuccses }) {
  const [signup, setSignup] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const errorPopup = (title, message) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: message,
      confirmButtonColor: "#36899e",
    });
  };
  const warningPopup = (title, message) => {
    Swal.fire({
      icon: "warning",
      title: title,
      confirmButtonColor: "#36899e",
      timer: 2500,
      text: message,
      timerProgressBar: true,
    });
  };

  // let errorMessage =
  let inputIsValid = () => {
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

  let registerToFirebase = () => {
    if (password !== passwordVal) {
      warningPopup("Verification Failed", "Passwords are not the same");
      return;
    }
    if (!(phone && name)) {
      warningPopup(
        "Missing details",
        `Please enter ${!name ? "name" : "phone number"}`
      );
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

  let loginToFirebase = () => {
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

  let handleOnClick = (e) => {
    e.preventDefault();
    if (!inputIsValid()) {
      return;
    }
    if (signup) registerToFirebase();
    else loginToFirebase();
  };

  let addUserToCollection = (user) => {
    // const usersRef = collection(db, "users");
    setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      phone: phone,
      parkingOwner: false,
      parkings: null,
      desc: "",
      image: false,
      fav: null,
    })
      .then((e) => setSuccses(true))
      .catch((e) => console.log(e));
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
