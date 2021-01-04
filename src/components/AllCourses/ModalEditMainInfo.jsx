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
  Row,
  Col,
} from "reactstrap";
import mongose from "mongoose";
import { editCourseData } from "fetchers/courses";
import TagsInput from "react-tagsinput";

export default class ModalEditMainInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      course: props.course,
      tags: props.course.course_tags || [],
      tag: "",
    };
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    let newData = {};
    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        newData[form[index].name] = form[index].value;
      }
    }

    newData.course_tags = this.state.tags;

    editCourseData(this.state.course._id, newData, (data) => {
      this.setState({
        course: {
          ...this.props.course,
          ...data,
        },
      });
      this.props.handleCourseDataChanged({
        ...this.props.course,
        ...data,
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

  handleChange = (tags) => {
    this.setState({ tags });
  };

  handleChangeInput = (tag) => {
    this.setState({ tag });
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className=" modal-lg p-0">
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
                <i className="fa fa-pencil mr-2"></i>edit course
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
              <Row>
                <Col xs="4">
                  <p className="m-0 mt-1">course title:</p>
                  <Input
                    defaultValue={this.state.course.course_title || ""}
                    name="course_title"
                    required
                  />
                </Col>
                <Col xs="4">
                  <p className="m-0 mt-1">author id:</p>
                  <Input
                    id="imput"
                    defaultValue={this.state.course.course_author_id}
                    name="course_author_id"
                    required
                  />
                </Col>
                <Col xs="4">
                  <p className="m-0 mt-1">short link:</p>
                  <Input
                    defaultValue={this.state.course.course_short_link || ""}
                    name="course_short_link"
                    required
                  />
                </Col>
              </Row>

              <p className="m-0 mt-4">Course Price (in dollars $$$):</p>
              <Input
                defaultValue={this.state.course.course_price || 0}
                name="course_price"
                type="number"
                required
              />

              <p type="text-area" className="m-0 mt-4">
                Tags:
              </p>
              <TagsInput
                value={this.state.tags}
                onChange={this.handleChange}
                className="form-control react-tagsinput"
                inputValue={this.state.tag}
                onChangeInput={this.handleChangeInput}
              />

              <p type="text-area" className="m-0 mt-4">
                description:
              </p>
              <Input
                defaultValue={this.state.course.course_description || ""}
                name="course_description"
                required
              />

              <p type="text-area" className="m-0 mt-4">
                long description:
              </p>
              <Input
                type="textarea"
                style={{
                  maxHeight: 190,
                  height: 190,
                }}
                defaultValue={this.state.course.course_long_description || ""}
                name="course_long_description"
                required
              />
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
