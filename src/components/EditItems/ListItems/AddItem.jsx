import Alerts from "helpers/Alerts";
import React from "react";
import { useFirestore } from "reactfire";
import { Button, ButtonGroup, Card, CardBody } from "reactstrap";

export default function AddItem({ items, course }) {
  const fireStore = useFirestore();

  const handleAddItem = (type) => {
    const documentRef = fireStore.collection("course_items").doc();

    let newItem = {
      id: documentRef.id,
      item_title: `no name ${items.length}`,
      item_description: "no description",
      item_course_id: course.id,
      item_author_id: course.course_author_id,
      item_type: type,
      item_sort: `${items.length}`,
    };

    documentRef.set(newItem).then(() => {
      Alerts.showToast("new item was added!");
    });

    Alerts.showLoading();
  };

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
