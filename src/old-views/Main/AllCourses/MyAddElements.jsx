import React, { Component } from "react";
import { Button } from "reactstrap";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardHeader from "reactstrap/lib/CardHeader";
import CardTitle from "reactstrap/lib/CardTitle";
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
        <Card className="my-3">
          <CardHeader>
            <CardTitle tag="h6" className="mb-0">
              <i className="fa fa-plus mr-2"></i>Anadir
            </CardTitle>
          </CardHeader>

          <CardBody>
            <Button onClick={this.toogleModal}>
              <i className="fa fa-pluss mr-2" />
              Anadir curso
            </Button>
          </CardBody>
        </Card>

        <ModalAddCourse
          isOpen={this.state.modal}
          handleCourseDataChanged={this.props.handleCourseDataChanged}
          setCurrentView={this.props.setCurrentView}
          toogleModal={this.toogleModal}
        />
      </div>
    );
  }
}
