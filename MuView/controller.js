// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXcJMOh6gD59Ihae73UDT5Bvrd3Dxfm3A",
  authDomain: "mobile3190-ca5c8.firebaseapp.com",
  projectId: "mobile3190-ca5c8",
  storageBucket: "mobile3190-ca5c8.firebasestorage.app",
  messagingSenderId: "16113947259",
  appId: "1:16113947259:web:957154bd3485f70b3b48de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);