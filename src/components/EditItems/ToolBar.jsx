import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const ToolBar = () => {
  return (
    <Card className="mb-4">
      <CardBody className="d-flex p-1">
        <Link className="btn ml-1 mr-3" to="/courses">
          <h6 className="mb-0">
            <i className="fa fa-arrow-left mr-2" />
            courses
          </h6>
        </Link>
        <h3 className="mb-0 my-auto">Editing course...</h3>
      </CardBody>
    </Card>
  );
};

export default ToolBar;
