import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AllCourses from "./components/AllCourses";
import EditItems from "./components/EditItems";
import Main from "./components/App";
import Settings from "./components/Settings";
import PaymentReports from "./components/PaymentReports";
import Profile from "./components/Profile";

//firebase
import AuthWrapper from "components/common/auth/AuthWrapper";
import OnlyAdminsWrapper from "components/common/auth/OnlyAdminsWrapper";
import PerfectScrollWraper from "components/common/PerfectScrollWraper";

export default function App() {
  return (
    <AuthWrapper>
      <OnlyAdminsWrapper>
        <PerfectScrollWraper>
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
              exact
              path="/profile"
              render={(props) => <Profile {...props} />}
            />
            <Route
              path="/edit/:course"
              render={(props) => <EditItems {...props} />}
            />
          </Router>
        </PerfectScrollWraper>
      </OnlyAdminsWrapper>
    </AuthWrapper>
  );
}
