// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "brctc-116e8.firebaseapp.com",
  projectId: "brctc-116e8",
  storageBucket: "brctc-116e8.appspot.com",
  messagingSenderId: "322183703991",
  appId: "1:322183703991:web:4b4a9acc9ec1dfa1258c32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);