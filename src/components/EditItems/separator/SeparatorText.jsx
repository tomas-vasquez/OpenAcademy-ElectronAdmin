import Alerts from "helpers/Alerts";
import React, { useState } from "react";
import { useFirestore } from "reactfire";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Input,
  Button,
} from "reactstrap";

export default function SeparatorText({ item }) {
  const [item_title, setItem_title] = useState(item.item_title || "");

  const firestore = useFirestore();

  const onHandleSubmit = (e) => {
    e.preventDefault();

    let newData = {
      ...item.item,
      item_title,
    };

    firestore
      .collection("course_items")
      .doc(item.id)
      .update(newData)
      .then(() => {
        Alerts.showSuccess();
      });
    Alerts.showLoading();
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle tag="h4" className="mb-0 d-flex">
          <i className="fa fa-tag mr-3" />
          Title:
        </CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={onHandleSubmit}>
          <p className="m-0 mt-1">titulo:</p>
          <Input
            value={item_title}
            onChange={(e) => {
              setItem_title(e.target.value);
            }}
            name="item_title"
            required
          />
          <div className="d-flex">
            <Button type="submit" color="success" className="mt-3 ml-auto">
              <i className="fa fa-save mr-2" />
              Save
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
