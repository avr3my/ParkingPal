import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { auth, db, storage } from "./firebaseConfig";

export const deleteAllParkings = async (parkings) => {
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
  if (!parking.availability) return null;
  console.log(parking.availability.monday);
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
  console.log(day, time);
  return (
    (parking.availability[day][0]?.start < time &&
      time < parking.availability[day][0]?.end) ||
    (parking.availability[day][1]?.start < time &&
      time < parking.availability[day][1]?.end)
  );
};
