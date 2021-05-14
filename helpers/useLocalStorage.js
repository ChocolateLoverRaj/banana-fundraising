import useLocalStorage from "react-use-localstorage";

const useSsrLocalStorage = (key, initial) => {
  return typeof window === "undefined"
    ? [initial, (value) => undefined]
    : // eslint-disable-next-line
      useLocalStorage(key, initial);
};

export default useSsrLocalStorage;
