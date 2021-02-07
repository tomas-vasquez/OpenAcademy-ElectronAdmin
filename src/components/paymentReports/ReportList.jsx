import React from "react";

import moment from "moment";
import { useState } from "react";
import ModalPreviewReport from "./ModalPreviewReport";

import { deletePaymentReport } from "fetchers/paymentReports";

function ReportList({ paymentReports, courses, users }) {
  const [currentReport, setCurrentReport] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const toggle = () => setOpenModal(!openModal);

  const handleClick = (e, report) => {
    e.preventDefault();
    deletePaymentReport(report, () => {});
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <table className="table mb-0 table-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">image count</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentReports &&
                paymentReports.map((report, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{report._id}</td>
                    <td>{report.report_images.length}</td>
                    <td>{report.report_subject.tipe}</td>
                    <td>
                      {moment(report.created_at, moment.ISO_8601).toNow()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm mr-2"
                        onClick={() => {
                          setCurrentReport(report);
                          setOpenModal(true);
                        }}
                      >
                        <i className="fa fa-eye" />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => handleClick(e, report)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {currentReport && (
        <ModalPreviewReport
          isOpen={openModal}
          toggle={toggle}
          currentReport={currentReport}
          courses={courses}
          users={users}
        />
      )}
    </>
  );
}

export default ReportList;
