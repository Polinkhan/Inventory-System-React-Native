import { createContext, useContext, useState } from "react";

const DATA = {
  data: {},
};

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
  const [database, setDatabase] = useState(DATA);

  const value = { theme, setTheme, database, setDatabase };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
