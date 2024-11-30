// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBnRqDh59J5JiG0J1Yv6UhXX4fQHbo8-lE",
    authDomain: "contactmanager-9d239.firebaseapp.com",
    projectId: "contactmanager-9d239",
    storageBucket: "contactmanager-9d239.firebasestorage.app",
    messagingSenderId: "961826540854",
    appId: "1:961826540854:web:88ed1b377a25befb4db797",
    measurementId: "G-R6Z0FKB34K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export auth and db for use in other files
export { auth, db };