// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDyr8SzTJD6XaH3VHLSkJ4P86FTu-X5cMo",
  authDomain: "docpost-mvp.firebaseapp.com",
  projectId: "docpost-mvp",
  storageBucket: "docpost-mvp.appspot.com",
  messagingSenderId: "965621374225",
  appId: "1:965621374225:web:c3f85b9df987f71478c0b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://mail.google.com/')
export default app;