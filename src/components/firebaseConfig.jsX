import { initializeApp } from "firebase/app";

// Firebase Authentication
import { getAuth, signOut } from 'firebase/auth';

// Firestore (for user profiles, storing and retrieving data)
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase Storage (for profile picture upload)
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBwdmBrHxJqGBS8k4kXzsbWm7cyf0eM1mk",
    authDomain: "tagup-291dc.firebaseapp.com",
    projectId: "tagup-291dc",
    storageBucket: "tagup-291dc.firebasestorage.app",
    messagingSenderId: "1026602121187",
    appId: "1:1026602121187:web:0643f33697e2d5d38d52d6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);      // Authentication
export const db = getFirestore(app);   // Firestore (for user profiles)
export const storage = getStorage(app); // Storage (for profile pics)
