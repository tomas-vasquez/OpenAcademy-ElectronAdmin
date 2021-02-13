import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";

import ToolBar from "./ToolBar";
import ListItems from "./ListItems";
import SeparatorText from "./separator/SeparatorText";

import VideoInformation from "./video/VideoInformation";
import Description from "./video/Description";
import TestEditor from "./tests/TestEditor";
import Loading from "components/auth/Loading";
import { useFirestore } from "reactfire";

export default function EditItems() {
  const [course, setCourse] = useState(null);
  const [targetItem, setTargetItem] = useState(null);
  const [isLoadCourse, setIsLoadCourse] = useState(false);

  const fireStore = useFirestore();

  useEffect(() => {
    const courseName = document.location.pathname.split("/")[2];

    fireStore.collection("courses").onSnapshot((snapshot) => {
      let courses = [];
      snapshot.forEach((doc) => courses.push({ ...doc.data(), id: doc.id }));
      setCourse(
        courses.find((_course) => _course.course_short_link === courseName)
      );
      setIsLoadCourse(true);
    });
  }, []);

  if (!isLoadCourse) return <Loading texto="loading course..." />;

  return (
    <>
      <ToolBar />
      <Container fluid>
        <Row>
          <Col xs="8">
            {targetItem ? (
              targetItem.item_type === "video" ? (
                <>
                  <VideoInformation item={targetItem} />
                  <Description item={targetItem} />
                </>
              ) : targetItem.item_type === "test" ? (
                <>
                  <SeparatorText item={targetItem} />
                  <TestEditor item={targetItem} />
                </>
              ) : targetItem.item_type === "separator" ? (
                <SeparatorText item={targetItem} />
              ) : null
            ) : null}
          </Col>

          <Col xs="4">
            <ListItems
              item={targetItem}
              course={course}
              setTargetItem={setTargetItem}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

//   handleItemChanged = (item, setATargetItem = true) => {
//     let index = items.findIndex((_item) => {
//       return item._id === _item._id;
//     });

//     let newItems = [...items];

//     if (index !== -1) {
//       newItems[index] = item;
//     } else {
//       newItems.push(item);
//     }

//     this.setState({
//       items: newItems,
//     });

//     setATargetItem &&
//       this.setState({
//         targetItem: item,
//       });
//   };

//   handleItemTargetChanged = (item) => {
//     this.setState({
//       targetItem: item,
//     });
//   };

//   componentDidMount() {
//     const courseName = document.location.pathname.split("/")[2];
//     getAllCourses((data) => {
//       console.log("data", data);

//       this.setState({
//         course: data.find((course) => {
//           return course.course_short_link === courseName;
//         }),
//       });
//       getItems(courseName, (data) => {
//         this.setState({
//           items: data.items,
//         });
//       });
//     });
//   }

//   render() {
//     return (
//           );
//   }
// }
