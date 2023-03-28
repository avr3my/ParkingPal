import "./userProfile.css";
import {
  errorPopup,
  successPopup,
  warningPopup,
  confirmPopup,
} from "../../popup";
import Avatar from "../../Assets/defaultAvatar.png";
import Input from "./Input";

import { useState, useEffect, useRef } from "react";

import { actionCodeSettings } from "../../App";
// firebase functions
import { auth, storage, db } from "../../firebaseConfig";
import { updateEmail, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { deleteAllParkings, logError } from "../../otherFunctions";
export default function UserProfile({ setSuccses }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(Avatar);

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editDesc, setEditDesc] = useState(false);

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    // upload image to firebase
    if (!imageUpload) return;
    const imageRef = ref(storage, "users/" + auth.currentUser.uid);
    uploadBytes(imageRef, imageUpload)
      .then(() => getImage())
      .catch((e) => logError(e));
  }, [imageUpload]);

  useEffect(() => {
    // get user data from collection
    if (!(auth && auth.currentUser)) return;
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((e) => {
        setUserData(e.data());
      })
      .catch((err) => logError("error", err));
  }, [editName, editPhone, editEmail, editDesc, auth.currentUser]);

  const getImage = () => {
    if (!(auth && auth.currentUser)) return;
    const imageRef = ref(storage, "users/" + auth.currentUser.uid);
    getDownloadURL(imageRef)
      .then((e) => setUserImage(e))
      .catch(() => {});
  };

  useEffect(getImage, [auth.currentUser]);
  const setEdit = (selection) => {
    let variables = [editName, editPhone, editEmail, editDesc];
    let functions = [setEditName, setEditPhone, setEditEmail, setEditDesc];
    let refs = [nameRef, phoneRef, emailRef, descRef];
    functions.forEach((f) => f(false));
    functions[selection](!variables[selection]);
    if (!variables[selection]) refs[selection].current.focus();
  };

  const deleteAccount = async () => {
    let ans = await confirmPopup(
      "Are you sure?",
      "You won't be able to revert this!",
      "Yes, delete it!"
    );
    if (!ans) return;
    const id = auth.currentUser.uid;
    let parkings = userData?.parkings;
    deleteDoc(doc(db, "users", id))
      .then(() => {
        deleteObject(ref(storage, "users/" + id));

        deleteAllParkings(parkings).finally(() => {
          deleteUser(auth.currentUser)
            .then(() => {
              successPopup("Deleted!", "Account deleted succesfully");
              setSuccses(false);
            })
            .catch(() =>
              errorPopup("Failed to delete account", "Log out and try again")
            );
        });
      })
      .catch(() => errorPopup(null, "Failed to delete account"));
  };

  const updateDocument = (selection) => {
    let userRef = doc(db, "users", auth.currentUser.uid);
    if (selection === "email") {
      let email = userData.email;
      updateEmail(auth.currentUser, email)
        .then(() =>
          updateDoc(userRef, userData).then(() => setEditEmail(false))
        )
        .catch((err) => {
          if (err.code === "auth/requires-recent-login") {
            setEditEmail(false);
            warningPopup("Time issue", "Please sign out and try again");
          } else if (err.code === "auth/invalid-email") {
            warningPopup("Invalid Email", "Please enter valid email address");
          } else {
            alert("Failed");
            logError(err);
          }
        });

      return;
    }
    updateDoc(userRef, userData);
    setEdit(0);
    setEditName(false);
  };

  const resetPassword = async () => {
    let ans = await confirmPopup("Are you sure?", "", "Yes, reset it!");
    if (!ans) return;
    sendPasswordResetEmail(auth, auth.currentUser.email, actionCodeSettings)
      .then(() => setSuccses(false))
      .catch((e) => logError(e));
  };

  
  const general = {
    updateDocument: updateDocument,
    userData: userData,
    setUserData: setUserData,
    setEdit: setEdit,
  };
  return (
    <div className="user-profile">
      <div className="image-div">
        <label htmlFor="file">
          <span className="set-image">
            <i className="fa-solid fa-camera"></i>
          </span>
          <img src={userImage} alt="" />
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={(e) => setImageUpload(e.target.files[0])}
        />
      </div>
      <div className="details">
        <Input general={general} edit={editName} data={"name"} refr={nameRef} />
        <Input
          general={general}
          edit={editPhone}
          data={"phone"}
          refr={phoneRef}
        />
        <Input
          general={general}
          edit={editEmail}
          data={"email"}
          refr={emailRef}
        />
        <div className="btns">
          <button className="delete-btn" onClick={deleteAccount}>
            Delete my profile
          </button>
          <button className="reset-btn" onClick={resetPassword}>
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
}
