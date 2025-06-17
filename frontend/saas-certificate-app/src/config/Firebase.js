// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyBs1EJVxMPYSK4q699vVpF1ey_n8Sx4XeY",
    authDomain: "digi-certificate-850dc.firebaseapp.com",
    projectId: "digi-certificate-850dc",
    storageBucket: "digi-certificate-850dc.firebasestorage.app",
    messagingSenderId: "248936747551",
    appId: "1:248936747551:web:e86195e36ce91481153b2a",
    measurementId: "G-997EMYS2CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);