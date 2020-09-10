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
import MyAddElements from "./MyAddElements";

export default class AllCourses extends Component {
  constructor() {
    super();
    this.state = {
      courses: null,
    };
  }

  componentDidMount() {
    Axios.get(coursesUrl)
      .then((data) => {
        this.setState({ courses: data.data.courses });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }

  handleCourseDataChanged = (_course) => {
    console.log(_course);
    let index = this.state.courses.findIndex((course) => {
      return course._id === _course._id;
    });

    let newCourses = [...this.state.courses];
    if (index !== -1) {
      newCourses[index] = _course;
    } else {
      newCourses.push(_course);
    }

    console.log(index);

    this.setState({
      courses: newCourses,
    });
  };

  render() {
    return (
      <Container>
        <Card className="mb-4">
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
                  handleCourseDataChanged={this.handleCourseDataChanged}
                />
              ))
            ) : (
              <div className="d-flex">
                <Spinner className="mx-auto my-5" />
              </div>
            )}
          </CardBody>
        </Card>

        <MyAddElements
          handleCourseDataChanged={this.handleCourseDataChanged}
          setCurrentView={this.props.setCurrentView}
        />
      </Container>
    );
  }
}
