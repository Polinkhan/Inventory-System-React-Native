import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { db } from "../firebase-init";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const DataContext = createContext({
  theme: {
    bg: null,
    nav: null,
    txt: null,
    primary: null,
    secondary: null,
  },
  DATA: null,
});
export const useDataContext = () => useContext(DataContext);
const DataContextProvider = (props) => {
  const light = {
    bg: "#f2f2f2",
    nav: "#456bfe",
    txt: "#FFFFFF",
    primary: "#694fad",
    secondary: "",
  };

  const [theme, setTheme] = useState(light);
  const [database, setDatabase] = useState();
  const [isDataLoad, setDataLaod] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inventoryData"), (snap) => {
      const FULLDATA = {};
      snap.docs.forEach((doc) => {
        FULLDATA[doc.id] = doc.data();
      });
      setDatabase(FULLDATA.data);
      setDataLaod(true);

      return () => unsub();
    });
  }, []); //eslint-disable-line

  const updateDatabase = (updatedData) => {
    setDoc(doc(db, "inventoryData", "data"), updatedData);
  };

  const value = {
    theme,
    setTheme,
    database,
    updateDatabase,
    isDataLoad,
  };

  return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>;
};

export default DataContextProvider;
