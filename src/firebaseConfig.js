import { initializeApp } from 'firebase/app'

import {
  getFirestore
  // , collection, onSnapshot,
  // addDoc, deleteDoc, doc,
  // query, where,
  // orderBy, serverTimestamp,
  // updateDoc
} from 'firebase/firestore'

import {
  getAuth,
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword, signOut,
  // onAuthStateChanged
} from 'firebase/auth'

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


// // initiating firebase app and services
initializeApp(firebaseConfig)

export const db = getFirestore() // my data base
export const auth = getAuth()    // user authentification
export const storage = getStorage()

// collection ref
// const parkingsRef = collection(db, 'parkings')
// console.log(parkingsRef);


// // querie example
// const q = query(parkingsRef, where("id", "==", "current user id"), orderBy('some order(key in item  (optional)' ))


// realtime collection data
// onSnapshot(parkingsRef, (snapshot) => {
//   let parkings = []
//   snapshot.docs.forEach(doc => {
//     parkings.push({ ...doc.data(), id: doc.id })
//   })
//   console.log("all parkings:",parkings)
// })


// // adding docs
//   addDoc(parkingsRef, {
//     addres: "1414 president st"
//     owner_id: user.id,
//     createdAt: serverTimestamp()
//   })
//   .then(() => {
//     console.log("done");
//   })


// deleting docs
// const deleteBookForm = document.querySelector('.delete')
// deleteBookForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const docRef = doc(db, 'parkings', deleteBookForm.id.value)

//   deleteDoc(docRef)
//     .then(() => {
//     })
// })

// fetching a single document (& realtime)
// const docRef = doc(db, 'parkings', 'gGu4P9x0ZHK9SspA1d9j')

// const unsubDoc = onSnapshot(docRef, (doc) => {
//   console.log(doc.data(), doc.id)
// })

// updating a document
// const updateForm = document.querySelector('.update')
// updateForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   let docRef = doc(db, 'parkings', updateForm.id.value)

//   updateDoc(docRef, {
//     title: 'updated title'
//   })
//   .then(() => {
//     updateForm.reset()
//   })
// })


// signing users up
// const signupForm = document.querySelector('.signup')
// signupForm.addEventListener('submit', (e) => {
//   e.preventDefault()


//   const email = signupForm.email.value
//   const password = signupForm.password.value


//   createUserWithEmailAndPassword(auth, email, password)
//     .then(cred => {
//       console.log('user created:', cred.user)
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })


// logging in and out
// const logoutButton = document.querySelector('.logout')
// logoutButton.addEventListener('click', () => {
//   signOut(auth)
//     .then(() => {
//       console.log('user signed out')
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })


// const loginForm = document.querySelector('.login')
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const email = loginForm.email.value
//   const password = loginForm.password.value

//   signInWithEmailAndPassword(auth, email, password)
//     .then(cred => {
//       console.log('user logged in:', cred.user)
//       loginForm.reset()
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })

// // subscribing to auth changes
// const unsubAuth = onAuthStateChanged(auth, (user) => {
//   console.log('user status changed:', user)
// })

// // unsubscribing from changes (auth & db)
// const unsubButton = document.querySelector('.unsub')
// unsubButton.addEventListener('click', () => {
//   console.log('unsubscribing')
//   unsubCol()
//   unsubDoc()
//   unsubAuth()
// })