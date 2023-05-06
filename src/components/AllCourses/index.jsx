import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";

import SingleCourse from "./SingleCourse";
import AddCourse from "./AddCourse";

import NoData from "components/common/NoData";
import Loading from "components/common/auth/Loading";
import Layout from "components/common/Layout";

import FirebaseContext from "context/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { connect } from "react-redux";

function AllCourses(props) {
  const { children, user } = props;
  const firebase = useContext(FirebaseContext);

  const [courses, setCourses] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const myFunction = async () => {
    let _courses = [];
    const db = firebase.firestore();
    const querySnapshot = await getDocs(
      query(collection(db, "courses"), where("course_author_id", "==", user.id))
    );

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      _courses.push(item);
    });

    setCourses(_courses);
    setIsComplete(true);
  };

  const handleCourseDataChanged = (course) => {
    let _courses = courses;
    _courses = _courses.map((_course) => {
      if (_course.id === course.id) return course;
      else return _course;
    });
    setCourses(_courses);
  };

  useEffect(() => {
    myFunction();
  }, []);

  return (
    <Layout {...props}>
      <div className="content">
        {!isComplete ? (
          <Loading style={{ height: "70vh" }} texto="loading courses....." />
        ) : (
          <Container fluid>
            {courses ? (
              <>
                {courses.length === 0 && <NoData />}
                {courses.map((course) => (
                  <SingleCourse
                    key={course.id}
                    course={course}
                    handleCourseDataChanged={handleCourseDataChanged}
                  />
                ))}
              </>
            ) : null}
            {/* <AddCourse /> */}
          </Container>
        )}
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.settings.user,
  };
};

export default connect(mapStateToProps)(AllCourses);
