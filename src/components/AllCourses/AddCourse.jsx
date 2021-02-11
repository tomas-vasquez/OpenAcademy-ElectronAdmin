import React, { useState } from "react";
import Alerts from "helpers/Alerts";
import { useFirestore, useUser } from "reactfire";
import {
  Modal,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "reactstrap";

export default function AddCourse() {
  const [modal, setModal] = useState(false);
  const toogleModal = () => setModal(!modal);

  const { data: user } = useUser();
  const fireStore = useFirestore();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    let newCourse = {};
    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        newCourse[form[index].name] = form[index].value;
      }
    }

    fireStore
      .collection("courses")
      .doc()
      .set(newCourse)
      .then(() => {
        toogleModal();
        Alerts.showSuccess();
      });
    Alerts.showLoading();
  };

  return (
    <>
      <div>
        <Card
          className="m-0"
          style={{
            border: "1px solid #344675",
            boxShadow: "0 1px 20px 0px #3446757a",
          }}
        >
          <CardBody>
            <Button onClick={toogleModal}>
              <i className="fa fa-plus mr-2" />
              Add course
            </Button>
          </CardBody>
        </Card>
      </div>
      <Modal
        isOpen={modal}
        role="dialog"
        className="modal-centered modal-lg p-0"
      >
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
                <i className="fa fa-plus mr-2" />
                Add course
              </CardTitle>
              <CardTitle
                tag="h4"
                className="mb-0 ml-auto"
                onClick={toogleModal}
              >
                <i className="fa fa-times"></i>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <p className="m-0 mt-3">Course Title:</p>
              <Input name="course_title" required />
              <p className="m-0 mt-3">Author id:</p>
              <Input
                id="imput"
                defaultValue={user.uid}
                name="course_author_id"
                required
              />
              <p className="m-0 mt-3">
                Short link (only lower case letters and the underscore):
              </p>
              <Input name="course_short_link" pattern="[a-z_]+" required />
              <p type="text-area" className="m-0 mt-3">
                Course Description:
              </p>
              <Input type="textarea" name="course_description" required />
            </CardBody>
            <CardFooter className="d-flex">
              <Button color="success" className="ml-auto" type="submit">
                <i className="fa fa-save mr-2" />
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Modal>
    </>
  );
}
