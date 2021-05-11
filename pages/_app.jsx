import "./global.less";
import { Header } from "../components";

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;
