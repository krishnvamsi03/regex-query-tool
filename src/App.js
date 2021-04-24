import "./App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";
import React, { useContext, useEffect } from "react";
import * as action from "./store/actions/auth";
import { GlobalStore } from "./index";

function App() {
  const value = useContext(GlobalStore);
  useEffect(() => {
    if (null == value.token) {
      action.authCheckState(value.dispatch);
    }
  });

  return (
    <React.Fragment>
      <Navbar />
      <Main />
    </React.Fragment>
  );
}

export default App;
