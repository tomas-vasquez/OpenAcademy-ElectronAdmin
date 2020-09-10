import React, { Component } from "react";

import {
  Modal,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  CardFooter,
  Button,
} from "reactstrap";
import Axios from "axios";
import mongose from "mongoose";
import { addCourseUrl } from "config";

export default class ModalEditMainInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      course: props.course,
    };
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    let data = {};
    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
      }
    }

    Axios.put(`${addCourseUrl}/${this.state.course._id}`, data)
      .then((response) => {
        alert("ok");
        this.setState({
          course: {
            ...this.props.course,
            ...response.data,
          },
        });
        this.props.handleCourseDataChanged({
          ...this.props.course,
          ...response.data,
        });
        console.log(">>>>>>>", {
          ...this.state.course,
          ...response.data,
        });
        this.props.toogleModal();
      })
      .catch((error) => {
        alert("error");
        alert(JSON.stringify(error));
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
          <Card>
            <CardHeader className="d-flex" style={{ cursor: "pointer" }}>
              <CardTitle tag="h5" className="mb-0">
                <i className="fa fa-pencil mr-2"></i>Editar curso
              </CardTitle>
              <CardTitle
                tag="h5"
                className="mb-0 ml-auto"
                onClick={this.props.toogleModal}
              >
                <i className="fa fa-times"></i>
              </CardTitle>
            </CardHeader>

            <CardBody>
              <label className="m-0 mt-1">titulo del curso:</label>
              <Input
                defaultValue={this.state.course.course_title}
                name="course_title"
                required
              />

              <label className="m-0 mt-1">author id:</label>
              <Input
                id="imput"
                defaultValue={this.state.course.course_author_id}
                name="course_author_id"
                required
              />

              <label className="m-0 mt-1">enlace corto:</label>
              <Input
                defaultValue={this.state.course.course_short_link}
                name="course_short_link"
                required
              />

              <label type="text-area" className="m-0 mt-1">
                descripcion:
              </label>
              <Input
                type="textarea"
                defaultValue={this.state.course.course_description}
                name="course_description"
                required
              />
            </CardBody>
            <CardFooter>
              <Button type="submit">
                <i className="fa fa-save mr-2" />
                Guardar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Modal>
    );
  }
}
