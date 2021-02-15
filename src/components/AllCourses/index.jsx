import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

import SingleCourse from "./SingleCourse";
import AddCourse from "./AddCourse";

import NoData from "components/common/NoData";
import Loading from "components/common/auth/Loading";
import { useFirestore, useUser } from "reactfire";
import Layout from "components/common/Layout";

export default function AllCourses(props) {
  const [courses, setCourses] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const fireStore = useFirestore();
  const { data: user } = useUser();

  useEffect(() => {
    fireStore
      .collection("courses")
      .where("course_author_id", "==", user.uid)
      .onSnapshot((snapshot) => {
        const products = [];
        snapshot.forEach((doc) => products.push({ ...doc.data(), id: doc.id }));
        setCourses(products);
        setIsComplete(true);
      });
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
                  <SingleCourse key={course.id} course={course} />
                ))}
              </>
            ) : null}
            <AddCourse />
          </Container>
        )}
      </div>
    </Layout>
  );
}
