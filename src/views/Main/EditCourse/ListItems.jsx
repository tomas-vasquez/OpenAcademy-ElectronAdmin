import React from "react";
import classname from "classname";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ButtonGroup,
  Button,
  Spinner,
} from "reactstrap";

export default function ListItems({ items }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          Items del curso
        </CardTitle>
      </CardHeader>
      <CardBody>
        {items ? (
          items.map((item, key) => (
            <Card
              className={classname("mb-3", {
                "bg-primary": item.item_type === "video",
                "bg-success": item.item_type === "test",
                "bg-warning": item.item_type === "separator",
              })}
              key={key}
            >
              <CardBody className="p-2 text-white">
                <i
                  className={classname("fa mr-2", {
                    "fa-film": item.item_type === "video",
                    "fa-pencil": item.item_type === "test",
                    "fa-minus": item.item_type === "separator",
                  })}
                />
                {item.item_title}
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="d-flex">
            <Spinner className="mx-auto my-5" />
          </div>
        )}

        <hr></hr>
        <label>
          <i className="fa fa-plus mr-1"></i>Anadir:
        </label>
        <div className="d-flex">
          <ButtonGroup className="mx-auto">
            <Button color="primary">clase de video</Button>
            <Button color="success">test o examen</Button>
            <Button color="warning">separador</Button>
          </ButtonGroup>
        </div>
      </CardBody>
    </Card>
  );
}
