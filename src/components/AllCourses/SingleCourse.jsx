import React from "react";
import { Card, CardBody, Button, Col, Row, CardImg } from "reactstrap";
// import { pageUrl } from "config";
import ModalEditMainInfo from "./ModalEditMainInfo";
import { Link } from "react-router-dom";
import { uploadCover } from "fetchers/courseCover";

// const { shell } = window.require("electron");

export default class SingleCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
    };
  }

  toogleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  render() {
    const { course, handleCourseDataChanged } = this.props;

    return (
      <Card className="mb-4">
        <CardBody>
          <Row>
            <Col xs="auto">
              {course.course_pic_url ? (
                <CardImg style={{ width: 200 }} src={course.course_pic_url} />
              ) : (
                <CardImg
                  style={{ width: 200, height: 120 }}
                  src={require("assets/img/NO_IMG_600x600.png")}
                />
              )}
            </Col>
            <Col>
              <h3 className="m-0">{course.course_title}</h3>
              <span>{`_id:"${course._id}"  `}</span>
              <span>{`autor_id:"${course.course_author_id}"`}</span>
              <p>{course.course_description}</p>
              <div className="d-flex ml-auto">
                <Button
                  className="mr-2"
                  onClick={() => {
                    this.toogleModal();
                  }}
                >
                  <i className="fa fa-pencil mr-2" />
                  edit info
                </Button>
                <Button
                  onClick={() => {
                    document.getElementById(`imput-pic-${course._id}`).click();
                  }}
                  className="mr-2"
                >
                  <i className="fa fa-pencil mr-2" />
                  edit pic
                </Button>
                <Link
                  className="btn mr-2"
                  to={"/edit/" + course.course_short_link}
                >
                  <i className="fa fa-pencil mr-2" />
                  edit items
                </Link>
                <Button
                  className="mr-2"
                  color="success"
                  // onClick={() => {
                  //   shell.openExternal(
                  //     `${pageUrl}/${course.course_short_link}`
                  //   );
                  // }}
                >
                  <i className="fa fa-external-link-square mr-2" />
                  open in browser
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>

        <input
          id={`imput-pic-${course._id}`}
          onChange={(e) =>
            uploadCover(e, course, (newUrl) => {
              handleCourseDataChanged({
                ...course,
                ...{ course_pic_url: newUrl },
              });
            })
          }
          className="d-none"
          type="file"
          accept="image/jpg"
        ></input>

        <ModalEditMainInfo
          course={course}
          toogleModal={this.toogleModal}
          handleCourseDataChanged={handleCourseDataChanged}
          isOpen={this.state.openModal}
        />
      </Card>
    );
  }
}
