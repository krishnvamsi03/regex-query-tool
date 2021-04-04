import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Main/>
    </React.Fragment>
  );
}

export default App;
