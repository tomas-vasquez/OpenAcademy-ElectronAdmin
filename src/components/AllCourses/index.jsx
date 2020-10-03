import React, { Component } from "react";
import { Container, Spinner } from "reactstrap";

import SingleCourse from "./SingleCourse";
import MyAddElements from "./MyAddElements";

import { getAllCourses } from "fetchers/courses";

export default class AllCourses extends Component {
  constructor() {
    super();
    this.state = {
      courses: null,
    };
  }

  componentDidMount() {
    getAllCourses((data) => {
      this.setState({ courses: data.courses });
    });
  }

  handleCourseDataChanged = (_course) => {
    let index = this.state.courses.findIndex((course) => {
      return course._id === _course._id;
    });

    let newCourses = [...this.state.courses];
    if (index !== -1) {
      newCourses[index] = _course;
    } else {
      newCourses.push(_course);
    }

    this.setState({
      courses: newCourses,
    });
  };

  render() {
    return (
      <div className="content">
        <Container fluid>
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

          <MyAddElements
            handleCourseDataChanged={this.handleCourseDataChanged}
            setCurrentView={this.props.setCurrentView}
          />
        </Container>
      </div>
    );
  }
}
