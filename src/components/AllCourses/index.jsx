import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

import SingleCourse from "./SingleCourse";
import AddCourse from "./AddCourse";

import NoData from "components/common/NoData";
import Loading from "components/auth/Loading";
import { useFirestore } from "reactfire";

export default function AllCourses() {
  const [courses, setCourses] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const fireStore = useFirestore();

  useEffect(() => {
    fireStore.collection("courses").onSnapshot((snapshot) => {
      const products = [];
      snapshot.forEach((doc) => products.push({ ...doc.data(), id: doc.id }));
      setCourses(products);
      setIsComplete(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
}
