// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pawswipe-1e8b3.firebaseapp.com",
  projectId: "pawswipe-1e8b3",
  storageBucket: "pawswipe-1e8b3.appspot.com",
  messagingSenderId: "580223235791",
  appId: "1:580223235791:web:5b3af376f216ee618769ba",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp)

export default database;