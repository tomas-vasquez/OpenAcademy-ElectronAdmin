import React, { useState } from "react";
import { CardHeader, CardTitle, CardBody, Card, Button } from "reactstrap";

import "./highlight";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import "highlight.js/styles/monokai-sublime.css";
import Alerts from "helpers/Alerts";
import { useFirestore } from "reactfire";

var toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }],

  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  ["blockquote", "code-block"],

  ["clean"], // remove formatting button
];

export default function Description({ item }) {
  const [content, setContent] = useState(item.item_description);
  const firestore = useFirestore();

  const uploadDescription = () => {
    let newData = {
      ...item,
      item_description: content,
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
    <Card className="my-3">
      <CardHeader>
        <CardTitle tag="h4" className="mb-0 d-flex">
          <i className="fa fa-pencil mr-3" />
          Descripcion:
        </CardTitle>
      </CardHeader>
      <CardBody className="text-muted">
        <ReactQuill
          modules={{
            syntax: true,
            toolbar: toolbarOptions,
          }}
          className="bg-white"
          value={content || ""}
          onChange={(text) => {
            setContent(text);
          }}
        />
        <div className="d-flex">
          <Button
            type="submit"
            color="success"
            className="ml-auto mt-3"
            onClick={uploadDescription}
          >
            <i className="fa fa-save mr-2" />
            Save
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
