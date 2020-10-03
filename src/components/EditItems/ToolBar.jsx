import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
const ToolBar = ({ setCurrentView }) => {
  return (
    <Card className="mb-4">
      <CardBody className="d-flex">
        <Link className="btn mr-3" to="/courses">
          <h6 className="mb-0">
            <i className="fa fa-arrow-left mr-2" />
            atras
          </h6>
        </Link>
        <h3 className="mb-0">Editando curso...</h3>
      </CardBody>
    </Card>
  );
};

export default ToolBar;
