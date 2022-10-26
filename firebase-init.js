import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6AOH8NzRFvxXU3XEWgM2aVmnbjgLCA4M",
  authDomain: "shop-inventory-f77d0.firebaseapp.com",
  projectId: "shop-inventory-f77d0",
  storageBucket: "shop-inventory-f77d0.appspot.com",
  messagingSenderId: "835600051496",
  appId: "1:835600051496:web:ad4451d25882b13f9d741d",
  measurementId: "G-DTNZ6TZJ88",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
