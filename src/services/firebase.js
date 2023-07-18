// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SVAST_FIREBASE_API_KEY,
  authDomain: "svast-35a5f.firebaseapp.com",
  projectId: "svast-35a5f",
  storageBucket: "svast-35a5f.appspot.com",
  messagingSenderId: "836213586628",
  appId: "1:836213586628:web:bfb9c1201f0242b6aee791",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
