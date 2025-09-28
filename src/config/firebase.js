// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"; // 👈 Import Firestore


const firebaseConfig = {
  apiKey: "AIzaSyBv9sSfv8hEGrubYhx7mivSRHMWdP_yi80",
  authDomain: "fabrics-39e40.firebaseapp.com",
  projectId: "fabrics-39e40",
  storageBucket: "fabrics-39e40.firebasestorage.app",
  messagingSenderId: "930125040685",
  appId: "1:930125040685:web:e04be324d8a5af915d3ca4",
  measurementId: "G-C6FW4M28KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);