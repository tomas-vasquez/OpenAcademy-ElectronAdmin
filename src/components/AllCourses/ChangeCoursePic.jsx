import Alerts from "helpers/Alerts";
import React, { useContext } from "react";
import { Button } from "reactstrap";

import FirebaseContext from "context/FirebaseContext";

export default function ChangeCoursePic(props) {
  const { course, handleCourseDataChanged } = props;
  const firebase = useContext(FirebaseContext);

  const firestore = firebase.firestore();
  const storage = firebase.storage();

  const uploadCoursePic = (e) => {
    const file = e.target.files[0];
    var fileName = new Date().getMilliseconds() + "-" + file.name;
    const newRef = storage.ref("course-pics").child(fileName);

    newRef.put(file).then(() => {
      newRef.getDownloadURL().then((url) => {
        let newData = {
          ...course,
          course_pic_public_id: `/course-pics/${fileName}`,
          course_pic_url: url,
        };

        firestore.collection("courses").doc(course.id).update(newData);
        handleCourseDataChanged(newData);
        Alerts.showSuccess();
      });
    });
    Alerts.showLoading();
  };

  return (
    <>
      <Button
        onClick={() => {
          document.getElementById(`imput-pic-${course.id}`).click();
        }}
        className="mr-2"
      >
        <i className="fa fa-pencil mr-2" />
        edit pic
      </Button>
      <input
        id={`imput-pic-${course.id}`}
        onChange={uploadCoursePic}
        className="d-none"
        type="file"
        accept="image/jpg"
      />
    </>
  );
}
