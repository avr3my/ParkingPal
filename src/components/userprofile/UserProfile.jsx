import "./userProfile.css";

import Swal from "sweetalert2";
import Avatar from "../../Assets/defaultAvatar.png";
import { useState, useEffect, useRef } from "react";
import { auth, storage, db } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faPhone,
  faEnvelope,
  faAsterisk,
} from "@fortawesome/free-solid-svg-icons";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { deleteUser } from "firebase/auth";

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
    if (!imageUpload) return;
    const imageRef = ref(storage, "users/" + auth.currentUser.uid);
    uploadBytes(imageRef, imageUpload)
      .then(() => {})
      .catch((e) => console.log(e));
  }, [imageUpload]);

  useEffect(() => {
    if (!(auth && auth.currentUser)) return;
    const userAuth = auth.currentUser;
    getDoc(doc(db, "users", userAuth.uid))
      .then((e) => {
        setUserData(e.data());
      })
      .catch((err) => console.log("error", err));
  }, [editName, editPhone, editEmail, editDesc, auth.currentUser]);

  const setEdit = (selection) => {
    let variables = [editName, editPhone, editEmail, editDesc];
    let functions = [setEditName, setEditPhone, setEditEmail, setEditDesc];
    let refs = [nameRef, phoneRef, emailRef, descRef];
    functions.forEach((f) => f(false));
    functions[selection](!variables[selection]);
    refs[selection].current.focus();
  };

  const deleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#36899e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const id = auth.currentUser.uid;
        deleteDoc(doc(db, "users", id))
          .then((e) => {
            deleteUser(auth.currentUser)
              .then((e) => {
                Swal.fire("Deleted!", "Account deleted succesfully", "success");
                setSuccses(false);
              })
              .catch((e) =>
                Swal.fire({
                  icon: "error",
                  text: "Failed to delete account",
                })
              );
            deleteObject(ref(storage, "users/" + id));
          })
          .catch((e) =>
            Swal.fire({
              icon: "error",
              text: "Failed to delete account",
            })
          );
      }
    });
  };
  const updateDocument = (selection) => {
    //pass
  };
  // const updateUserProfile = () => {
  //   updateProfile(auth.currentUser, userData)
  //     .then((e) => console.log("success", e))
  //     .catch((err) => console.log("error", err));
  // };

  if (!(auth && auth.currentUser)) return;
  const imageRef = ref(storage, "users/" + auth.currentUser.uid);

  getDownloadURL(imageRef)
    .then((e) => setUserImage(e))
    .catch((e) => console.log(e));
  return (
    <div className="user-page bg_image">
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
              <FontAwesomeIcon icon={faAddressCard} />
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
                    onClick={(e) => setEdit(0)}
                    title="cancel"
                    className="material-symbols-outlined"
                  >
                    cancel
                  </span>
                  <span title="save" className="material-symbols-outlined">
                    save
                  </span>
                </span>
              ) : (
                <span
                  title="edit"
                  onClick={(e) => {
                    setEdit(0);
                    nameRef.current.focus();
                  }}
                  className="edit-btn material-symbols-outlined"
                >
                  edit
                </span>
              )}
            </div>
          </div>
          <div className="phone">
            <div className="">
              <FontAwesomeIcon icon={faPhone} />
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
                    onClick={(e) => setEdit(1)}
                    title="cancel"
                    className="material-symbols-outlined"
                  >
                    cancel
                  </span>
                  <span title="save" className="material-symbols-outlined">
                    save
                  </span>
                </span>
              ) : (
                <span
                  title="edit"
                  onClick={(e) => setEdit(1)}
                  className="edit-btn material-symbols-outlined"
                >
                  edit
                </span>
              )}
            </div>
          </div>
          <div className="email">
            <div className="">
              <FontAwesomeIcon icon={faEnvelope} />
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
                    onClick={(e) => setEdit(2)}
                    title="cancel"
                    className="material-symbols-outlined"
                  >
                    cancel
                  </span>
                  <span title="save" className="material-symbols-outlined">
                    save
                  </span>
                </span>
              ) : (
                <span
                  title="edit"
                  onClick={(e) => setEdit(2)}
                  className="edit-btn material-symbols-outlined"
                >
                  edit
                </span>
              )}
            </div>
          </div>
          <div className="desc">
            <div style={{ textAlign: "left" }} className="">
              <FontAwesomeIcon icon={faAsterisk} />
              <span> Description: </span>
              <b>temporary! </b>
            </div>
            <div className="update-div">
              {editDesc ? (
                <span className="edit-menu">
                  <span
                    onClick={(e) => setEdit(3)}
                    title="cancel"
                    className="material-symbols-outlined"
                  >
                    cancel
                  </span>
                  <span title="save" className="material-symbols-outlined">
                    save
                  </span>
                </span>
              ) : (
                <span
                  title="edit"
                  onClick={(e) => setEdit(3)}
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
    </div>
  );
}
