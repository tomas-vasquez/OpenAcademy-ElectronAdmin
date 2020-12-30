import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Modal,
} from "reactstrap";

export default function ModalPreviewReport({ isOpen, toggle, currentReport }) {
  return (
    <Modal isOpen={isOpen} className="modal-lg">
      <Card
        className="m-0"
        style={{
          border: "1px solid #344675",
          boxShadow: "0 1px 20px 0px #3446757a",
        }}
      >
        <CardHeader className="d-flex" style={{ cursor: "pointer" }}>
          <CardTitle tag="h4">
            <i className="fa fa-dollar mr-2" />
            payment report
          </CardTitle>
          <CardTitle tag="h4" className="mb-0 ml-auto" onClick={toggle}>
            <i className="fa fa-times"></i>
          </CardTitle>
        </CardHeader>

        <CardBody>{JSON.stringify(currentReport)}</CardBody>
        <CardFooter className="text-right">
          <Button color="success">aprove</Button>
          <Button color="danger">decline</Button>
        </CardFooter>
      </Card>
    </Modal>
  );
}
