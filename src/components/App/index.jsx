import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";

// const { app } = window.require("electron").remote;

class App extends Component {
  render() {
    return (
      <div className="content">
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo mb-2" alt="logo" />
            <h2>--=== Your Academy Tool Adminer ===--</h2>
          </div>
          <p className="App-intro">
            <b> Release 0.2.7 </b>
            {/* Version: {app.getVersion()} */}
          </p>
          <hr />
          <div className="text-left">
            {JSON.stringify(this.props.userData)}
            <hr />
            {JSON.stringify(this.props.paymentReports)}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userData: state.userData,
  paymentReports: state.paymentReports,
});

export default connect(mapStateToProps)(App);
