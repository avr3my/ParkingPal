import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { auth, db, storage } from "./firebaseConfig";

export const deleteAllParkings = async (parkings) => {
  console.log(auth.currentUser.uid);
  parkings.forEach((parking) => {
    deleteDoc(doc(db, "parkings", parking))
      .then((e) => console.log("file success", e))
      .catch((e) => console.log("file failed", e));
    deleteObject(ref(storage, "parkings" + parking))
      .then((e) => console.log("image success", e))
      .catch((e) => console.log("image failed", e));
  });
};
