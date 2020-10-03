import React from "react";
import { Card, CardBody, Button } from "reactstrap";
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
        <Button className="ml-auto">
          <h6 className="mb-0">
            <i className="fa fa-upload mr-2" />
            Guardar cambios
          </h6>
        </Button>
      </CardBody>
    </Card>
  );
};

export default ToolBar;
