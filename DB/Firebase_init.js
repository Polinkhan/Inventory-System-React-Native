import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCES-uiLdQdzysa0Y_Lx6nqtBudm40fZPc",
  authDomain: "khanhouse-b54f2.firebaseapp.com",
  projectId: "khanhouse-b54f2",
  storageBucket: "khanhouse-b54f2.appspot.com",
  messagingSenderId: "731020571285",
  appId: "1:731020571285:web:52b6f4b35a8a9781a9619c",
  measurementId: "G-8D9ZDTS2BH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };
