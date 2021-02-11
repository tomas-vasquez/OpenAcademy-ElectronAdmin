import Alerts from "helpers/Alerts";
import React from "react";
import { useFirestore, useStorage } from "reactfire";
import { Button } from "reactstrap";

export default function ChangeCoursePic({ course }) {
  const storage = useStorage();
  const firestore = useFirestore();

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

        firestore
          .collection("courses")
          .doc(course.id)
          .update(newData);
        Alerts.showSuccess();
      });
    });
    Alerts.showLoading();
  };

  return (
    <>
      <Button
        onClick={() => {
          document.getElementById(`imput-pic-${course._id}`).click();
        }}
        className="mr-2"
      >
        <i className="fa fa-pencil mr-2" />
        edit pic
      </Button>
      <input
        id={`imput-pic-${course._id}`}
        onChange={uploadCoursePic}
        className="d-none"
        type="file"
        accept="image/jpg"
      />
    </>
  );
}
