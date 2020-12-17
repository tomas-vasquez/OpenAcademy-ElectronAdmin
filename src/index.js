import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route} from "react-router-dom";

import "./assets/css/black-dashboard-react.min.css";
import "./assets/css/myStyles.css";
import "font-awesome/css/font-awesome.min.css";

import AllCourses from "views/AllCourses";
import EditItems from "views/EditItems";
import Main from "views/Main";
import Settings from "views/Settings";

ReactDOM.render(
  <Router>
    <Route exact path="/" render={(props) => <Main {...props} />} />
    <Route
      exact
      path="/settings"
      render={(props) => <Settings {...props} />}
    />
    <Route
      exact
      path="/courses"
      render={(props) => <AllCourses {...props} />}
    />
    <Route
      path="/edit/:course"
      render={(props) => <EditItems {...props} />}
    />
  </Router>,
  document.getElementById("root")
);
