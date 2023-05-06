import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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

//redux
import { Provider as ReduxProvider } from "react-redux";
import store from "store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AuthWrapper>
        <OnlyAdminsWrapper>
          <PerfectScrollWraper>
            <Router>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/payment_reports" element={<PaymentReports />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit/:course" element={<EditItems />} />
              </Routes>
            </Router>
          </PerfectScrollWraper>
        </OnlyAdminsWrapper>
      </AuthWrapper>
    </ReduxProvider>
  );
}
