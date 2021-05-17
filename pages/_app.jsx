import "./global.less";
import { Header } from "../components";
import { GlobalContextProvider } from "../helpers";

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <GlobalContextProvider>
      <Header />
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
};

export default App;
