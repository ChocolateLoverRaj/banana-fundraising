import useLocalStorage from "use-local-storage";

const useSsrLocalStorage = (key, initial) => {
  return typeof window === "undefined"
    ? [initial, (value) => undefined]
    : // eslint-disable-next-line
      useLocalStorage(key, initial);
};

export default useSsrLocalStorage;
