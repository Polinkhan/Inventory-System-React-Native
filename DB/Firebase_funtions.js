import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./Firebase_init";

const getAllDocumentsData = () => {
  return new Promise(async (resolve, reject) => {
    const Data = [];
    const querySnapshot = await getDocs(collection(db, "Unknown_Catagory"));
    querySnapshot.forEach((doc) => {
      Data.push({ ...doc.data(), id: doc.id });
      if (querySnapshot.size === Data.length) resolve(Data);
    });
  });
};

const getDocumentData = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "Unknown_Catagory", id);
      const docSnap = await getDoc(docRef);
      resolve(docSnap.data());
    } catch {
      reject();
    }
  });
};

const addProductData = (id, data, isBarCodeScanned) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!isBarCodeScanned) {
        const newId = `${parseInt(id) + 1}`;
        await setDoc(doc(db, "System_Data", "last_auto_id"), { id: newId });
      }
      await setDoc(doc(db, "Unknown_Catagory", id), data);
      resolve({ message: "Product Added Successfully" }, { merge: true });
    } catch (e) {
      reject(e);
    }
  });
};

export { getAllDocumentsData, addProductData, getDocumentData };
