import React, { Component } from "react";
import { Button, Card, CardBody } from "reactstrap";
import ModalAddCourse from "./ModalAddCourse";

export default class MyAddElements extends Component {
  constructor() {
    super();
    this.state = { modal: false };
  }

  toogleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <div>
        <Card
          className="m-0"
          style={{
            border: "1px solid #344675",
            boxShadow: "0 1px 20px 0px #3446757a",
          }}
        >
          <CardBody>
            <Button onClick={this.toogleModal}>
              <i className="fa fa-plus mr-2" />
              Add course
            </Button>
          </CardBody>
        </Card>

        <ModalAddCourse
          isOpen={this.state.modal}
          handleCourseDataChanged={this.props.handleCourseDataChanged}
          toogleModal={this.toogleModal}
        />
      </div>
    );
  }
}
