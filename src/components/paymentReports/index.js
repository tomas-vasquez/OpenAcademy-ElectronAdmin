import { loadPaymentReports } from "fetchers/paymentReports";
import React, { Component } from "react";

import { connect } from "react-redux";
import ReportList from "./ReportList";

class PaymentReports extends Component {
  componentDidMount() {
    if (!this.props.paymentReports) loadPaymentReports((reports) => {});
  }

  render() {
    const { paymentReports } = this.props;

    return (
      <div className="content">
        <h2>Payment reports ({paymentReports && paymentReports.length})</h2>
        {/* <div>{JSON.stringify(paymentReports)}</div> */}
        <ReportList paymentReports={paymentReports} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  paymentReports: state.paymentReports,
});

export default connect(mapStateToProps)(PaymentReports);
