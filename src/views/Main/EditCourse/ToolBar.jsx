import React from "react";
import { Card, CardBody, NavItem, Nav, Button } from "reactstrap";

const ToolBar = ({ setCurrentView }) => {
  return (
    <Card className="mb-4">
      <CardBody className="d-flex">
        <Button
          color="primary"
          className="mr-3"
          onClick={() => {
            setCurrentView("courses");
          }}
        >
          <h6 className="mb-0">
            <i className="fa fa-arrow-left mr-2" />
            atras
          </h6>
        </Button>
        <h3>Editando curso...</h3>
        <Button color="warning" className="ml-auto">
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
