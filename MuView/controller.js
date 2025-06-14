// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6rcol1Z97h4qf-k7oXDa5ZocMlzDsRsM",
  authDomain: "mobile3190v.firebaseapp.com",
  projectId: "mobile3190v",
  storageBucket: "mobile3190v.firebasestorage.app",
  messagingSenderId: "935826311541",
  appId: "1:935826311541:web:9233e750ef8c4d4b2a6b3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);