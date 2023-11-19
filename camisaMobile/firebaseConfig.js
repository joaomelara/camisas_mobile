// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdPyC9Ct0svYH3DwnjilkHKOg1L3Kqdxg",
  authDomain: "prova-melara.firebaseapp.com",
  projectId: "prova-melara",
  storageBucket: "prova-melara.appspot.com",
  messagingSenderId: "637672275047",
  appId: "1:637672275047:web:63a7eaf5fe0db607c068c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const app_auth = getAuth(app);
export const app_db = getFirestore(app);


