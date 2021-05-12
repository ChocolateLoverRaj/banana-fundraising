import "./global.less";
import { Header } from "../components";

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <div className="dark">
      <Header />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
