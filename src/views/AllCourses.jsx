import React, { Component } from "react";
import Layouth from "../components/common/Layout";
import AllCoursess from "../components/AllCourses";

export default class AllCourses extends Component {
  render() {
    return (
      <Layouth {...this.props}>
        <AllCoursess />
      </Layouth>
    );
  }
}
