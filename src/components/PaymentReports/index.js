// import { getAllCourses } from "fetchers/courses";
// import { loadPaymentReports } from "fetchers/paymentReports";
import React, { Component } from "react";

import { connect } from "react-redux";
import ReportList from "./ReportList";

class PaymentReports extends Component {
  // componentDidMount() {
  //   const { paymentReports, courses } = this.props;
  //   if (!paymentReports) loadPaymentReports();
  //   if (!courses) getAllCourses();
  // }

  render() {
    const { paymentReports, courses, users } = this.props;

    return (
      <div className="content">
        <h2>Payment reports ({paymentReports && paymentReports.length})</h2>
        <ReportList
          paymentReports={paymentReports}
          courses={courses}
          users={users}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  paymentReports: state.paymentReports,
  courses: state.courses,
  users: state.users,
});

export default connect(mapStateToProps)(PaymentReports);
