// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0bIfyDAKiyU2rktwevM4ld46otNqIlU0",
  authDomain: "inventory-management-c3ca1.firebaseapp.com",
  projectId: "inventory-management-c3ca1",
  storageBucket: "inventory-management-c3ca1.appspot.com",
  messagingSenderId: "902282327793",
  appId: "1:902282327793:web:1a15674cf5694a1976db50",
  measurementId: "G-N02753N0S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };