// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-aogqnBRMMkLgkdOn4-3zO7Y9SqNIlq8",
  authDomain: "tempatwisata-11041.firebaseapp.com",
  projectId: "tempatwisata-11041",
  storageBucket: "tempatwisata-11041.appspot.com",
  messagingSenderId: "847117742472",
  appId: "1:847117742472:web:26c23f0af0203e342e8a3d",
  measurementId: "G-F3Z9S0FJEJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
