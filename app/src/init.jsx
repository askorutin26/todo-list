import React from "react";

import { AppProvider } from "./Context/index.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import App from "./App";

const init = () => {
  const vdom = (
    <React.StrictMode>
      <Provider store={store}>
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
    </React.StrictMode>
  );
  return vdom;
};
export default init;
