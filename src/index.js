import React from "react";
import ReactDOM from "react-dom";

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./assets/css/black-dashboard-react.min.css";
import "./assets/css/myStyles.css";
import "font-awesome/css/font-awesome.min.css";

import AllCourses from "views/AllCourses";
import Main from "views/Main";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" render={(props) => <Main {...props} />} />
      <Route
        exact
        path="/courses"
        render={(props) => <AllCourses {...props} />}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);
