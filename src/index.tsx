import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/rootReducer";
import thunk from "redux-thunk";

function localStorageMiddleware(getState: any) {
  return (next: any) => (action: any) => {
    const result = next(action);
    localStorage.setItem("appState", JSON.stringify(getState()));
    return result;
  };
}

function getLS(): any {
  return localStorage.getItem("appState");
}

function reHydrateStore(): any {
  if (getLS() !== null) {
    return JSON.parse(getLS());
  }
}

const store = createStore(
  rootReducer,
  reHydrateStore(),
  applyMiddleware(thunk, localStorageMiddleware)
);

store.subscribe(() => {
  localStorage.setItem("appState", JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
