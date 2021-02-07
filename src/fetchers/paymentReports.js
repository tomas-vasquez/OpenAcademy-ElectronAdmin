import Alerts from "helpers/Alerts";
import Axios from "axios";
import { apiUrl } from "config";
import DB from "helpers/DB";
import store from "../store";
import { addReport, deleteReport } from "store/payment_report_store/actions";

export const loadPaymentReports = (_callback) => {
  Alerts.showLoading();

  Axios.get(apiUrl + "/payment/report", {
    headers: {
      "Content-Type": "application/json",
      "api-token": DB.get("api-token"),
    },
  })
    .then((response) => {
      Alerts.showLoading(false);
      const reports = [...response.data];
      reports.forEach((report) => {
        store.dispatch(addReport(report));
      });
      // store.log();
      _callback && _callback(response.data);
    })
    .catch((error) => {
      Alerts.showErrorUnknow();
      console.error(error);
    });
};

export const deletePaymentReport = (report, _callback) => {
  Alerts.showLoading();
  const paymentReportId = report._id;

  Axios({
    method: "delete",
    url: `${apiUrl}/payment/report/${paymentReportId}`,
    headers: {
      "Content-Type": "application/json",
      "api-token": DB.get("api-token"),
    },
  })
    .then((response) => {
      store.dispatch(deleteReport(paymentReportId));
      store.log();
      Alerts.showSuccess("Espere...", "Perfecto!!!");

      _callback();
    })
    .catch((error) => {
      Alerts.showErrorUnknow();
      console.error(error);
    });
};
