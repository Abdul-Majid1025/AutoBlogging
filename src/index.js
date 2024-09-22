import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { configureAppStore } from "./Store/store";
import { Provider } from "react-redux";

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
