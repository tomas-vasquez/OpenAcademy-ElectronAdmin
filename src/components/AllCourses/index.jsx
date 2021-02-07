import React, { Component } from "react";
import { Container } from "reactstrap";

import SingleCourse from "./SingleCourse";
import MyAddElements from "./MyAddElements";

import { getAllCourses } from "fetchers/courses";
import { connect } from "react-redux";
import store from "store";
import { replace_courses } from "store/courses_store/actions";

class AllCourses extends Component {
  componentDidMount() {
    if (!this.props.courses) getAllCourses();
  }

  handleCourseDataChanged = (_course) => {
    const { courses } = this.props;
    let index = courses.findIndex((course) => {
      return course._id === _course._id;
    });

    let newCourses = [...courses];
    if (index !== -1) {
      newCourses[index] = _course;
    } else {
      newCourses.push(_course);
    }

    store.dispatch(replace_courses(newCourses));
  };

  render() {
    const { courses } = this.props;
    return (
      <div className="content">
        <Container fluid>
          {courses ? (
            <>
              {courses.map((course) => (
                <SingleCourse
                  key={course._id}
                  course={course}
                  handleCourseDataChanged={this.handleCourseDataChanged}
                />
              ))}
            </>
          ) : null}
          <MyAddElements
            handleCourseDataChanged={this.handleCourseDataChanged}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses,
});

export default connect(mapStateToProps)(AllCourses);
