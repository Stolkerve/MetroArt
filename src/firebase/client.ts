// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN-0_jTNh7E7TndivTwMQPzCbQfMckAaE",
  authDomain: "metroart-d9c81.firebaseapp.com",
  projectId: "metroart-d9c81",
  storageBucket: "metroart-d9c81.appspot.com",
  messagingSenderId: "18014046867",
  appId: "1:18014046867:web:2ccc346a1844d1cdd3db66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const store = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const facebookProvider = new GoogleAuthProvider();
facebookProvider.setCustomParameters({ prompt: "select_account" });
