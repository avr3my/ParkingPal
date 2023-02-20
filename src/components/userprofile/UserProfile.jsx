import "./userProfile.css";
import Swal from "sweetalert2";
import { errorPopup, successPopup, warningPopup } from "../../popup";
import Avatar from "../../Assets/defaultAvatar.png";

import { useState, useEffect, useRef } from "react";

// firebase functions
import { auth, storage, db } from "../../firebaseConfig";
import { updateEmail, deleteUser } from "firebase/auth";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

export default function UserProfile({ setSuccses }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(Avatar);
  const [renderImage, setRenderImage] = useState(false);

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
      .then(() => {
        setRenderImage(!renderImage);
      })
      .catch((e) => console.log(e));
  }, [imageUpload]);

  useEffect(() => {
    // get user data from collection
    if (!(auth && auth.currentUser)) return;
    const userAuth = auth.currentUser;
    getDoc(doc(db, "users", userAuth.uid))
      .then((e) => {
        setUserData(e.data());
      })
      .catch((err) => console.log("error", err));
  }, [editName, editPhone, editEmail, editDesc, auth.currentUser]);

  useEffect(() => {
    // get image from torage
    if (!(auth && auth.currentUser)) return;
    const imageRef = ref(storage, "users/" + auth.currentUser.uid);
    getDownloadURL(imageRef)
      .then((e) => setUserImage(e))
      .catch(() => {});
  }, [auth, auth.currentUser, renderImage]);

  const setEdit = (selection) => {
    let variables = [editName, editPhone, editEmail, editDesc];
    let functions = [setEditName, setEditPhone, setEditEmail, setEditDesc];
    let refs = [nameRef, phoneRef, emailRef, descRef];
    functions.forEach((f) => f(false));
    functions[selection](!variables[selection]);
    if (!variables[selection]) refs[selection].current.focus();
  };

  const deleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#36899e",
      focusCancel: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const id = auth.currentUser.uid;
        deleteDoc(doc(db, "users", id))
          .then(() => {
            deleteObject(ref(storage, "users/" + id));
            deleteUser(auth.currentUser)
              .then(() => {
                successPopup("Deleted!", "Account deleted succesfully");
                setSuccses(false);
              })
              .catch(() =>
                errorPopup("Failed to delete account", "Log out and try again")
              );
          })
          .catch(() => errorPopup(null, "Failed to delete account"));
      }
    });
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
            console.log(err);
          }
        });

      return;
    }
    updateDoc(userRef, userData);
    setEdit(0);
    setEditName(false);
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
        <div className="name">
          <div>
            <i className="fa-solid fa-address-card"></i>
            <span> Name: </span>
            {userData && (
              <input
                readOnly={!editName}
                ref={nameRef}
                type="text"
                value={userData.name}
                className="user-detail-input"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            )}
          </div>
          <div className="update-div">
            {editName ? (
              <span className="edit-menu">
                <span
                  onClick={() => setEdit(0)}
                  title="cancel"
                  className="material-symbols-outlined"
                >
                  cancel
                </span>
                <span
                  title="save"
                  onClick={() => updateDocument("name")}
                  className="material-symbols-outlined"
                >
                  save
                </span>
              </span>
            ) : (
              <span
                title="edit"
                onClick={() => setEdit(0)}
                className="edit-btn material-symbols-outlined"
              >
                edit
              </span>
            )}
          </div>
        </div>
        <div className="phone">
          <div className="">
            <i className="fa-solid fa-phone"></i>
            <span> Phone: </span>
            {userData && (
              <input
                readOnly={!editPhone}
                type="text"
                ref={phoneRef}
                value={userData.phone}
                className="user-detail-input"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    phone: isNaN(e.target.value)
                      ? userData.phone
                      : e.target.value,
                  })
                }
              />
            )}
          </div>
          <div className="update-div">
            {editPhone ? (
              <span className="edit-menu">
                <span
                  onClick={() => setEdit(1)}
                  title="cancel"
                  className="material-symbols-outlined"
                >
                  cancel
                </span>
                <span
                  title="save"
                  onClick={() => updateDocument("phone")}
                  className="material-symbols-outlined"
                >
                  save
                </span>
              </span>
            ) : (
              <span
                title="edit"
                onClick={() => setEdit(1)}
                className="edit-btn material-symbols-outlined"
              >
                edit
              </span>
            )}
          </div>
        </div>
        <div className="email">
          <div className="">
            <i className="fa-solid fa-envelope"></i>
            <span> Email: </span>
            {userData && (
              <input
                readOnly={!editEmail}
                ref={emailRef}
                type="text"
                value={userData.email}
                className="user-detail-input"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            )}
          </div>
          <div className="update-div">
            {editEmail ? (
              <span className="edit-menu">
                <span
                  onClick={() => setEdit(2)}
                  title="cancel"
                  className="material-symbols-outlined"
                >
                  cancel
                </span>
                <span
                  title="save"
                  onClick={() => updateDocument("email")}
                  className="material-symbols-outlined"
                >
                  save
                </span>
              </span>
            ) : (
              <span
                title="edit"
                onClick={() => setEdit(2)}
                className="edit-btn material-symbols-outlined"
              >
                edit
              </span>
            )}
          </div>
        </div>
        <div className="desc">
          <div style={{ textAlign: "left" }} className="">
            <i className="fa-solid fa-asterisk"></i>
            <span> Description: </span>
            <b>temporary! </b>
          </div>
          <div className="update-div">
            {editDesc ? (
              <span className="edit-menu">
                <span
                  onClick={() => setEdit(3)}
                  title="cancel"
                  className="material-symbols-outlined"
                >
                  cancel
                </span>
                <span
                  title="save"
                  onClick={() => updateDocument("desc")}
                  className="material-symbols-outlined"
                >
                  save
                </span>
              </span>
            ) : (
              <span
                title="edit"
                onClick={() => setEdit(3)}
                className="edit-btn material-symbols-outlined"
              >
                edit
              </span>
            )}
          </div>
        </div>
        <button className="delete-btn" onClick={deleteAccount}>
          Delete my profile
        </button>
      </div>
    </div>
  );
}
