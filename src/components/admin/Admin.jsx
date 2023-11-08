import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Nav from "../nav/Nav";
import "./Admin.css";

export default function Admin() {
  const [userTable, setUserTable] = useState(null);
  const [parkingsTable, setParkingsTable] = useState(null);
  const [isDeleteUser, setIsDeleteUser] = useState(false);

  const deleteParking = async (parkingId) => {
    await deleteDoc(doc(db, "parkings", parkingId));
    setIsDeleteUser((pre) => !pre);
  };

  const deleteUser = async ({ id, data }) => {
    console.log(id, data);
    data.parkings.forEach((parkingId) => {
      deleteParking(parkingId);
    });
    await deleteDoc(doc(db, "users", id));
    setIsDeleteUser((prev) => !prev);
  };

  const data = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const parkingSnapshot = await getDocs(collection(db, "parkings"));

      const userDataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const parkingsDataArray = parkingSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      const tableData = userDataArray.map((d, index) => {
        return (
          <tr key={index}>
            <td>{d.data.email}</td>
            <td>{d.data.name}</td>
            <td>{d.data.parkingOwner ? "Admin" : "User"}</td>
            <td>{d.data.phone}</td>
            <td>
              <button
                className="table-button"
                disabled={d.data.parkingOwner}
                onClick={() => deleteUser(d)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });

      const parkingTable = parkingsDataArray.map((d, index) => {
        return (
          <tr key={index}>
            <td>{d.data.ownerName}</td>
            <td>{d.data.address.properties.formatted}</td>
            <td>
              <button
                className="table-button"
                disabled={d.data.parkingOwner}
                onClick={() => deleteParking(d.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });

      setUserTable(tableData); // Set the table data in state
      setParkingsTable(parkingTable);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    data();
  }, [isDeleteUser]);

  return (
    <>
      <div className="Admin-page">
        {userTable && (
          <div className="table scroll-container">
            <h1>User Data Table</h1>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody >{userTable}</tbody>
            </table>
          </div>
        )}
        {parkingsTable && (
          <div className="table scroll-container">
            <h1>Parking Data Table</h1>
            <table>
              <thead>
                <tr>
                  <th>User name</th>
                  <th>Location</th>
                  <th>Delete Parking</th>
                </tr>
              </thead>
              <tbody>{parkingsTable}</tbody>
            </table>
          </div>
        )}
        
      </div>
    </>
  );
}
