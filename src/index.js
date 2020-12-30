import React from "react";
import ReactDOM from "react-dom";

import "./assets/css/black-dashboard-react.min.css";
import "./assets/css/myStyles.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App";

//redux
import { Provider } from "react-redux";
import store from "store";
import { setUserData } from "store/userData_store/actions";
import DB from "helpers/DB";

//load data
store.dispatch(setUserData(DB.get("userData")));

ReactDOM.render(
  <Provider store={store}>{<App />}</Provider>,
  document.getElementById("root")
);
