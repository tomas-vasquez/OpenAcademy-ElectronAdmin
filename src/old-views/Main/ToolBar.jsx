import React from "react";
import { Card, CardBody, Button } from "reactstrap";

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
            <i className="fa fa-book mr-2" />
            Cursos
          </h6>
        </Button>

        <Button
          color="primary"
          className="mr-3"
          onClick={() => {
            setCurrentView("curses");
          }}
        >
          <h6 className="mb-0">
            <i className="fa fa-cloud mr-2" />
            Copias de seguridad
          </h6>
        </Button>

        <Button
          color="warning"
          className="mr-3"
          onClick={() => {
            setCurrentView("curses");
          }}
        >
          <h6 className="mb-0">
            <i className="fa fa-terminal mr-2" />
            Ejecutar rutinas
          </h6>
        </Button>
      </CardBody>
    </Card>
  );
};

export default ToolBar;
