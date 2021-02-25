import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './app';
import { configureStore } from "./shared/store";

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
document.getElementById("root"));
