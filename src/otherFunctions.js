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

export const isAvailable = (parking) => {
  if(!parking.availability) return null
  let t = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[t.getDay()];
  let time = t.getHours() + ":" + t.getMinutes();
  return (
    (parking.availability[day][0]?.start < time &&
      time < parking.availability[day][0]?.end) ||
    (parking.availability[day][1]?.start < time &&
      time < parking.availability[day][1]?.end)
  );
};