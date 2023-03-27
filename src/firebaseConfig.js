import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBJi1LMqF2rVGHPBLstOQDos7sbbc2I-zE",
  authDomain: "parking-project-3e045.firebaseapp.com",
  projectId: "parking-project-3e045",
  storageBucket: "parking-project-3e045.appspot.com",
  messagingSenderId: "357132633793",
  appId: "1:357132633793:web:2067785ee8c50b88067640",
  measurementId: "G-8YJZP6X7D8"
};  

// initiating firebase app and services
initializeApp(firebaseConfig)

export const db = getFirestore()    // my data base
export const auth = getAuth()       // user authentification
export const storage = getStorage() // imgages database