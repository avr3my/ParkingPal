import "./userProfile.css";

import Avatar from "../../Assets/defaultAvatar.png";
import { useState, useEffect } from "react";
import { auth, storage, db } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCamera,
  faPhone,
  faEnvelope,
  faAsterisk,
} from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function UserProfile({ succses }) {
  const [userData, setUserData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [userImage, setUserImage] = useState(Avatar);

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editDesc, setEditDesc] = useState(false);

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [desc, setDesc] = useState(null);


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
  }, [editName, editPhone, editEmail, editDesc]);

  const setEdit = (selection) => {
    let variables = [editName, editPhone, editEmail, editDesc];
    let functions = [setEditName, setEditPhone, setEditEmail, setEditDesc];
    functions.forEach((f) => f(false));
    functions[selection](!variables[selection]);
  };

  const updateDocument = (selection)=> {
    //pass
  }
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
  if (!userData) {
    return;
  }
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
              <span> name: </span>
              <input
                readOnly={!editName}
                type="text"
                value={userData.name}
                className="user-detail-input"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
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
                  onClick={(e) => setEdit(0)}
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
              <span> phone: </span>
              <input
                readOnly={!editPhone}
                type="text"
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
              <span> email: </span>
              <input
                readOnly={!editEmail}
                type="text"
                value={userData.email}
                className="user-detail-input"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
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
        </div>
      </div>
    </div>
  );
}
