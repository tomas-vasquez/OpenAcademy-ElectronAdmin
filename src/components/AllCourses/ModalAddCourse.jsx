import React, { Component } from "react";
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
import mongose from "mongoose";
import { addCourse } from "fetchers/courses";

export default class ModalAddCourse extends Component {
  //
  constructor(props) {
    super();
    this.state = {
      course: props.course,
    };
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    let newCourse = {};
    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        newCourse[form[index].name] = form[index].value;
      }
    }

    addCourse(newCourse, (course) => {
      this.props.handleCourseDataChanged({
        ...course,
      });
      this.props.toogleModal();
    });
  };

  componentDidUpdate() {
    setTimeout(() => {
      //validation input AuthorId
      let inputId = document.getElementById("imput");
      if (inputId)
        inputId.addEventListener("input", (e) => {
          if (!mongose.Types.ObjectId.isValid(inputId.value)) {
            inputId.setCustomValidity("!invalid");
          } else {
            inputId.setCustomValidity("");
          }
        });
    }, 1000);
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className="modal-centered modal-lg p-0">
        <form onSubmit={this.onHandleSubmit}>
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
                onClick={this.props.toogleModal}
              >
                <i className="fa fa-times"></i>
              </CardTitle>
            </CardHeader>

            <CardBody>
              <p className="m-0 mt-1">titulo del course:</p>
              <Input name="course_title" required />

              <p className="m-0 mt-1">author id:</p>
              <Input id="imput" name="course_author_id" required />

              <p className="m-0 mt-1">enlace corto:</p>
              <Input name="course_short_link" required />

              <p type="text-area" className="m-0 mt-1">
                descripcion:
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
    );
  }
}
