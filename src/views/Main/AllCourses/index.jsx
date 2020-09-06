import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Container,
  Spinner,
} from "reactstrap";
import Axios from "axios";
import { coursesUrl } from "config";
import SingleCourse from "./SingleCourse";

export default class AllCourses extends Component {
  constructor() {
    super();
    this.state = {
      courses: null,
    };
  }

  componentDidMount() {
    Axios.get(coursesUrl)
      .then(data => {
        this.setState({ courses: data.data.courses });
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  }

  render() {
    return (
      <Container>
        <Card>
          <CardHeader>
            <CardTitle tag="h6" className="mb-0">
              Todos los Cursos
            </CardTitle>
          </CardHeader>
          <CardBody>
            {this.state.courses ? (
              this.state.courses.map((course, key) => (
                <SingleCourse
                  key={key}
                  course={course}
                  setCurrentView={this.props.setCurrentView}
                />
              ))
            ) : (
              <div className="d-flex">
                <Spinner className="mx-auto my-5" />
              </div>
            )}
          </CardBody>
        </Card>
      </Container>
    );
  }
}
