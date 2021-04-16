import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.js";
import reducer, { initialState } from "./store/reducers/auth";
import * as actionTypes from "./store/actions/actionTypes";
import { authLogin } from "./store/actions/auth";

export const GlobalStore = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatchBase] = React.useReducer(reducer, initialState);

  const dispatch = React.useCallback(asyncer(dispatchBase, state), []);

  const value = {
    token: state.token,
    error: state.error,
    loading: state.loading,
    dispatch: dispatch,
    state: state,
  };
  return <GlobalStore.Provider value={value}>{children}</GlobalStore.Provider>;
};

const asyncer = (dispatch, state) => (action) => {
  typeof action === "function" ? action(dispatch, state) : dispatch(state);
};

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default GlobalStore;
