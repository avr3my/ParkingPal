import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "./firebaseConfig";


export const logError = (...e) =>{
  console.log(...e);
}
export const deleteAllParkings = async (parkings) => {
  if(!parkings)return;
  parkings.forEach((parking) => {
    deleteDoc(doc(db, "parkings", parking))
      .then(() => {})
      .catch((e) => logError("file failed", e));
    deleteObject(ref(storage, "parkings" + parking))
      .then(() => {})
      .catch((e) => logError("image failed", e));
  });
};

export const isAvailable = (parking) => {
  if (!parking.availability) return null;
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
  let time =
    String(t.getHours()).padStart(2, "0") +
    ":" +
    String(t.getMinutes()).padStart(2, "0");
  return (
    (parking.availability[day][0]?.start < time &&
      time < parking.availability[day][0]?.end) ||
    (parking.availability[day][1]?.start < time &&
      time < parking.availability[day][1]?.end)
  );
};
