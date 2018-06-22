import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import Offline from "./js/components/Offline";

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
);
