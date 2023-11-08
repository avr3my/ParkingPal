import "./nav.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import 'firebase/auth';

import logo from "../../Assets/logo344.png";
import DarkMode from "../darkMode/DarkMode";
import { doc, getDoc } from "firebase/firestore";

export default function Nav({ current, setCurrent }) {
  const [open, setOpen] = useState(false);
  const [user,setUser] = useState(null);
 
  console.log(user);
  const logout = () => {
    signOut(auth);
  };

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          // Get the user document from Firestore based on the user's UID
          const userDoc = doc(db, 'users', auth.currentUser.uid);
          const snap = await getDoc(userDoc);
  
          if (snap.exists()) {
            const userData = snap.data();
            // Assuming you have a "role" field in the user document
            const role = userData.role;
            setUser({ ...auth.currentUser, role }); // Set the user object with role
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          fetchUserData(); // Fetch user data when the user is signed in
        } else {
          // User is signed out.
          setUser(null);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

  return (
    <nav>
      <Link to={"/"}>
        <img title="ParkingPal" className="logo" src={logo} alt="logo" />
      </Link>
      <span
        className="material-symbols-outlined burger"
        onClick={() => setOpen(!open)}
      >
        {open ? "close" : "menu"}
      </span>
      <div className={`nav-menu ${open ? "open" : ""}`}>
        <div onClick={() => { setOpen(false);setCurrent(1);}}className={current === 1 ? "selected" : ""}>
          {open && (
            <span className="material-symbols-outlined on-side">account_circle</span>
          )}
          My profile
        </div>
        <div onClick={() => {setOpen(false);setCurrent(2);}}className={current === 2 ? "selected" : ""}>
          {open && (
            <span className="material-symbols-outlined on-side">Favorite</span>
          )}
          Saved parkings
        </div>
        <div onClick={() => {setOpen(false);setCurrent(3);}}className={current === 3 ? "selected" : ""}>
          {open && (
            <span className="material-symbols-outlined on-side">local_parking</span>
          )}
          My parkings
        </div>
        {user && user.role === 'admin' && (
        <div onClick={() => {setOpen(false);setCurrent(4);}}className={current === 4 ? "selected" : ""}>
          {open && (<span className="material-symbols-outlined on-side">shield_person</span>)}
          Admin
        </div>
      )}
        {open && <div className="line"></div>}
        <Link className="logout" onClick={logout} to={"/"}>
          <span
            onClick={logout}
            title="log out"
            className="material-symbols-outlined logout"
          >
            logout
          </span>
          {open && <span onClick={logout} className="on-side logout">Log out</span>}
        </Link>
        <DarkMode />
        <div className="pseudo" onClick={()=>setOpen(false)}></div>
      </div>
    </nav>
  );
}
