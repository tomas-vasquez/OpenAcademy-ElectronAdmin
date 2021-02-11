import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AllCourses from "views/AllCourses";
import EditItems from "views/EditItems";
import Main from "views/Main";
import Settings from "views/Settings";
import PaymentReports from "views/PaymentReports";

//firebase
import AuthWrapper from "components/auth/AuthWrapper";
import OnlyAdminsWrapper from "components/auth/OnlyAdminsWrapper";

export default function App() {
  return (
    <AuthWrapper>
      <OnlyAdminsWrapper>
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
      </OnlyAdminsWrapper>
    </AuthWrapper>
  );
}
