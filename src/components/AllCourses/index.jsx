import React, { Component } from "react";
import { Container } from "reactstrap";

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
            <>
              {this.state.courses.map((course) => (
                <SingleCourse
                  key={course._id}
                  course={course}
                  handleCourseDataChanged={this.handleCourseDataChanged}
                />
              ))}

              <MyAddElements
                handleCourseDataChanged={this.handleCourseDataChanged}
              />
            </>
          ) : null}
        </Container>
      </div>
    );
  }
}
