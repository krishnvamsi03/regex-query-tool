import "./App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Pattern from "./components/patterns";
import React, { useContext, useEffect } from "react";
import * as action from "./store/actions/auth";
import { GlobalStore } from "./index";
import axios from "axios";

function App() {
  const value = useContext(GlobalStore);
  let state = {
    list: [],
  };

  useEffect(async () => {
    if (null == value.token) {
      await action.authCheckState(value.dispatch);
      if (value.token) {
        fetchRegex(true, value.token);
      }
    }
  });

  let clearState = () => {
    state.list = [];
  };

  let fetchRegex = (show, token = null) => {
    if (show && token) {
      axios
        .post("http://localhost:8000/api/saved", { token: token })
        .then((response) => {
          if (response && response.data) {
            let list = [];
            for (let item of response.data.list) {
              let temp = {};
              temp["id"] = item.id;
              temp["regexName"] = item.regexname;
              temp["regexPattern"] = item.regexpattern;
              temp["showCard"] = false;
              list.push(temp);
            }
            state.list = list;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      state.list = [];
    }
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
