// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2mCh8d8MbpzSZGEn2CXVzLjc37Cl3fbw",
  authDomain: "contact-52c30.firebaseapp.com",
  projectId: "contact-52c30",
  storageBucket: "contact-52c30.appspot.com",
  messagingSenderId: "156958583691",
  appId: "1:156958583691:web:f1a6d48b3dc5475faedd8e",
  measurementId: "G-NV68QZ1NTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore();
export default db;