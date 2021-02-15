import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useUser } from "reactfire";
import JSONTree from "react-json-tree";
import Layout from "components/common/Layout";

export default function App(props) {
  const user = useUser();

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
            <JSONTree
              data={{
                uid: user.data.uid,
                displayName: user.data.displayName,
                photoURL: user.data.photoURL,
                email: user.data.email,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
