import GlobalContext from "./GlobalContext";
import { useLocalStorage } from ".";

const GlobalContextProvider = (props) => {
  const { children } = props;

  const value = useLocalStorage("login");

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
