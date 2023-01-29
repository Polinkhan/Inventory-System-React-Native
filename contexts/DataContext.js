import { useToast } from "native-base";
import { createContext, useContext, useEffect, useState } from "react";
import { LogBox } from "react-native";
// import { fetchDataFromApi, fetcher } from "../utils/ApiCall";
import * as SecureStore from "expo-secure-store";
// import * as Network from "expo-network";

export const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(["Setting a timer"]);

const DataContextProvider = (props) => {
  const toast = useToast();
  const [currentUser, setCurrentUser] = useState({});
  const [contactLists, setContactLists] = useState([]);
  const [adData, setAdData] = useState([]);
  const [selectOptions, setSelectOptions] = useState(null);
  const [queryParam, setQueryParam] = useState({});
  const [payslipData, setPayslipData] = useState(null);
  const [initialFetch, setInitialFetch] = useState(null);

  // useEffect(() => {
  //   // const networkStatus = await Network.getNetworkStateAsync();
  //   // console.log(networkStatus);

  //   (async () => {
  //     if (currentUser) {
  //       fetcher
  //         .get(`${api}/db/${currentUser.UserID}`)
  //         .then((res) => {
  //           const { Date, contact_res, type } = res;
  //           setContactLists(contact_res);
  //           setSelectOptions({ Date, type });
  //         })
  //         .catch((err) => makeToast(err.message))
  //         .finally(() => setInitialFetch({ fetchErrorStatus: true }));
  //     } else {
  //       const accessToken = await SecureStore.getItemAsync("accessToken");
  //       fetcher
  //         .get(`${api}/auth`, { authorization: accessToken })
  //         .then((res) => setCurrentUser(res.user))
  //         .catch((err) => {
  //           setInitialFetch({
  //             fetchErrorStatus: err.status === 401 ? true : false,
  //             ...err,
  //           });
  //         });
  //     }
  //   })();
  // }, [currentUser]);

  const makeToast = (message) => {
    return toast.show({
      description: message,
    });
  };

  const value = {
    currentUser,
    setCurrentUser,
    queryParam,
    setQueryParam,
    contactLists,
    adData,
    selectOptions,
    payslipData,
    setPayslipData,
    makeToast,
    initialFetch,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
