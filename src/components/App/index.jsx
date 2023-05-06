import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { JSONTree } from "react-json-tree";
import Layout from "components/common/Layout";
import { connect } from "react-redux";

function App(props) {
  const { user } = props;

  return (
    <Layout {...props}>
      <div className="content">
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo mb-2" alt="logo" />
            <h2>--== Your Academy ==--</h2>
          </div>
          <div className="text-left">
            <p className="mt-2">User data:</p>
            <JSONTree data={user} />
          </div>
          <div className="text-left">
            <p className="mt-2">Env:</p>
            <JSONTree data={process.env} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.settings.user,
  };
};

export default connect(mapStateToProps)(App);
