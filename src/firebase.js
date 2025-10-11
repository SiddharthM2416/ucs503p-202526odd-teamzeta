// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnCxCdvSk1TvJ2O2JMtv3uhILPxh09B5E",
  authDomain: "myexpenseapp-cbe5c.firebaseapp.com",
  projectId: "myexpenseapp-cbe5c",
  storageBucket: "myexpenseapp-cbe5c.firebasestorage.app",
  messagingSenderId: "387854407730",
  appId: "1:387854407730:web:b8d032359f064c6b58042b",
  measurementId: "G-FGC4EGVGS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);