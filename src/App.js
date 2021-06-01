import "./App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";
import React, { useContext, useEffect } from "react";
import * as action from "./store/actions/auth";
import { GlobalStore } from "./index";

function App() {
  const value = useContext(GlobalStore);
  let state = {
    list: [],
  };

  useEffect(() => {
    if (null == value.token) {
      action.authCheckState(value.dispatch);
    }
  });

  let clearState = () => {
    state.list = [];
  };

  return (
    <React.Fragment>
      <Navbar onLogout={clearState} />
      <Main list={state.list} />
      {/* <Pattern /> */}
    </React.Fragment>
  );
}

export default App;
