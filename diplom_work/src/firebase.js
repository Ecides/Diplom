import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2oOKGAB6iLuVjBtUpb4eHnwFfiv9J510",
  authDomain: "diplom-77427.firebaseapp.com",
  projectId: "diplom-77427",
  storageBucket: "diplom-77427.firebasestorage.app",
  messagingSenderId: "560631965709",
  appId: "1:560631965709:web:bb5dcebf650fe3baf44d44"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();