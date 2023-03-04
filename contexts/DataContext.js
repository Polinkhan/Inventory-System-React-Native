import { useToast } from "native-base";
import { createContext, useContext, useEffect, useState } from "react";
import { LogBox, useColorScheme } from "react-native";
// import { fetchDataFromApi, fetcher } from "../utils/ApiCall";
import * as SecureStore from "expo-secure-store";
import { db } from "../DB/Firebase_init";
import { doc, onSnapshot } from "firebase/firestore";
// import * as Network from "expo-network";

export const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(["Setting a timer"]);

const DataContextProvider = (props) => {
  const toast = useToast();
  const systemColorScheme = useColorScheme();
  // const colorScheme = useColorScheme();
  // const colorScheme = "light";
  const [currentUser, setCurrentUser] = useState({});
  const [colorScheme, setColorScheme] = useState("light");
  const [autoId, setAutoId] = useState(null);
  const [barCode, setBarCode] = useState({ addItem: "", searchedItem: [] });

  const makeToast = (message) => {
    return toast.show({
      description: message,
    });
  };

  useEffect(() => {
    (async () => {
      const scheme = await SecureStore.getItemAsync("colorScheme");
      if (!scheme) setColorScheme("light");
      else setColorScheme(scheme);
    })();

    const unsub = onSnapshot(doc(db, "System_Data", "last_auto_id"), (doc) => {
      setAutoId(doc.data().id);
    });

    return () => unsub();
  }, []);

  const value = {
    autoId,
    colorScheme,
    setColorScheme,
    currentUser,
    setCurrentUser,
    makeToast,
    barCode,
    setBarCode,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
