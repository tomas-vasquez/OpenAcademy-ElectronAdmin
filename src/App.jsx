import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import AllCourses from "views/AllCourses";
import EditItems from "views/EditItems";
import Main from "views/Main";
import Settings from "views/Settings";
import PaymentReports from "views/PaymentReports";
import { connect } from "react-redux";
import Login from "components/auth/Login";

class App extends Component {
  render() {
    if (this.props.userData) {
      return (
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
            exact
            path="/payment_reports"
            render={(props) => <PaymentReports {...props} />}
          />
          <Route
            path="/edit/:course"
            render={(props) => <EditItems {...props} />}
          />
        </Router>
      );
    } else {
      return <Login />;
    }
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(App);
