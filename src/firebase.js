
import firebase from "@firebase/app";
import firestore from "@firebase/firestore";
import auth from "@firebase/auth";


const app = firebase.initializeApp({
  apiKey: "AIzaSyAUKsYfwloub20MlUCng6XMqegPF7245mo",
  authDomain: "clone-e10bb.firebaseapp.com",
  projectId: "clone-e10bb",
  storageBucket: "clone-e10bb.appspot.com",
  messagingSenderId: "597961686043",
  appId: "1:597961686043:web:1149e2d6c2201fb17c4cbe",
  measurementId: "G-LTN0B9BFBE"
});



const db = firebase.firestore(app)
const authenticate = firebase.auth(app)

export { db, authenticate }


