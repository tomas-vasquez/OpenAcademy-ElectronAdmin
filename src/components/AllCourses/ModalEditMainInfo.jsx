import React, { useState } from "react";

import {
  Modal,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  CardFooter,
  Button,
  Row,
  Col,
} from "reactstrap";
import TagsInput from "react-tagsinput";
import Alerts from "helpers/Alerts";
import { useFirestore } from "reactfire";

export default function ModalEditMainInfo({ course, toogleModal, isOpen }) {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const firestore = useFirestore();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    let newData = {};
    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        newData[form[index].name] = form[index].value;
      }
    }
    newData.course_tags = tags;

    alert(course.id);
    firestore
      .collection("courses")
      .doc(course.id)
      .update({ ...course, ...newData })
      .then(() => {
        Alerts.showSuccess();
      });
    Alerts.showLoading();
  };

  return (
    <Modal isOpen={isOpen} className=" modal-lg p-0">
      <form onSubmit={onHandleSubmit}>
        <Card
          className="m-0"
          style={{
            border: "1px solid #344675",
            boxShadow: "0 1px 20px 0px #3446757a",
          }}
        >
          <CardHeader className="d-flex" style={{ cursor: "pointer" }}>
            <CardTitle tag="h4">
              <i className="fa fa-pencil mr-2"></i>edit course
            </CardTitle>
            <CardTitle tag="h4" className="mb-0 ml-auto" onClick={toogleModal}>
              <i className="fa fa-times"></i>
            </CardTitle>
          </CardHeader>

          <CardBody>
            <Row>
              <Col xs="4">
                <p className="m-0 mt-1">course title:</p>
                <Input
                  defaultValue={course.course_title || ""}
                  name="course_title"
                  required
                />
              </Col>
              <Col xs="4">
                <p className="m-0 mt-1">author id:</p>
                <Input
                  id="imput"
                  defaultValue={course.course_author_id}
                  name="course_author_id"
                  required
                />
              </Col>
              <Col xs="4">
                <p className="m-0 mt-1">short link:</p>
                <Input
                  defaultValue={course.course_short_link || ""}
                  name="course_short_link"
                  required
                />
              </Col>
            </Row>

            <p className="m-0 mt-4">Course Price (in dollars $$$):</p>
            <Input
              defaultValue={course.course_price || 0}
              name="course_price"
              type="number"
              required
            />

            <p type="text-area" className="m-0 mt-4">
              Tags (type and press Enter to create a tag):
            </p>
            <TagsInput
              value={tags}
              onChange={(tags) => setTags(tags)}
              className="form-control react-tagsinput"
              inputValue={tag}
              onChangeInput={(tag) => setTag(tag)}
            />

            <p type="text-area" className="m-0 mt-4">
              description:
            </p>
            <Input
              defaultValue={course.course_description || ""}
              name="course_description"
              required
            />

            <p type="text-area" className="m-0 mt-4">
              long description:
            </p>
            <Input
              type="textarea"
              defaultValue={course.course_long_description || ""}
              name="course_long_description"
              required
            />
          </CardBody>

          <CardFooter className="d-flex">
            <Button color="success" className="ml-auto" type="submit">
              <i c lassName="fa fa-save mr-2" />
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Modal>
  );
}
