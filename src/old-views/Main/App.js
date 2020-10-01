import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const { app } = window.require("electron").remote;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo mb-2" alt="logo" />
          <h2>--=== Your Academy Tool Adminer ===--</h2>
        </div>
        <p className="App-intro">
          <b> Release 0.2.7 </b>
          Version: {app.getVersion()}
        </p>
      </div>
    );
  }
}

export default App;
