import React, { Component } from "react";
import Layouth from "../components/common/Layout";
import App from "components/paymentReports";

export default class Main extends Component {
  render() {
    return (
      <Layouth {...this.props}>
        <App />
      </Layouth>
    );
  }
}
