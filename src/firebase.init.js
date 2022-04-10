// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6XZz9xE3qaeJ_W9bY33E4lhoz8ngUx2c",
    authDomain: "ema-john-simple-40e69.firebaseapp.com",
    projectId: "ema-john-simple-40e69",
    storageBucket: "ema-john-simple-40e69.appspot.com",
    messagingSenderId: "525144588833",
    appId: "1:525144588833:web:5401482f0c3a57c3ea9960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;