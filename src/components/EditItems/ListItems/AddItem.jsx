import React from "react";
import { Button, ButtonGroup, Card, CardBody } from "reactstrap";

export default function AddItem({ handleAddItem }) {
  return (
    <Card
      className="m-0"
      style={{
        border: "1px solid #344675",
        boxShadow: "0 1px 20px 0px #3446757a",
      }}
    >
      <CardBody>
        <div className="d-flex">
          <ButtonGroup className="mx-auto">
            <Button
              onClick={() => {
                handleAddItem("video");
              }}
            >
              add video
            </Button>
            <Button
              onClick={() => {
                handleAddItem("test");
              }}
            >
              add test
            </Button>
            <Button
              onClick={() => {
                handleAddItem("separator");
              }}
            >
              add separator
            </Button>
          </ButtonGroup>
        </div>
      </CardBody>
    </Card>
  );
}
