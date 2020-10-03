import React from "react";
import { Card, CardBody, Button, Col, Row, CardImg } from "reactstrap";
import { coursePicsUrl } from "config";
import Axios from "axios";
import { uploadPicUrl, pageUrl } from "config";
import ModalEditMainInfo from "./ModalEditMainInfo";
import Alerts from "helpers/Alerts";
import { Link } from "react-router-dom";

const { shell } = window.require("electron");

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

  uploadPic = (e, course, _callback) => {
    const file = e.target.files[0];
    var formData = new FormData();
    formData.append("blob", file);
    formData.append("_id", course._id);

    Alerts.showLoading();
    Axios.post(uploadPicUrl, formData)
      .then((response) => {
        setTimeout(() => {
          Alerts.showSuccess();
          _callback(response.data);
        }, 1000);
      })
      .catch((error) => {
        Alerts.showErrorUnknow();
        console.error(error);
      });
  };

  render() {
    let { course, setCurrentView, handleCourseDataChanged } = this.props;

    return (
      <Card className="mb-4">
        <CardBody>
          <Row>
            <Col xs="auto">
              {course.course_pic_url ? (
                <CardImg
                  style={{ width: 200 }}
                  src={coursePicsUrl + course.course_pic_url}
                />
              ) : (
                <CardImg
                  style={{ width: 200, height: 120 }}
                  src={require("assets/img/NO_IMG_600x600.png")}
                />
              )}
            </Col>
            <Col>
              <h3>{course.course_title}</h3>
              <span>{`_id:"${course._id}"  `}</span>
              <span>{`autor_id:"${course.course_author_id}"`}</span>
              <p>{course.course_description}</p>
              <div className="d-flex ml-auto">
                <Button
                  className="mr-2"
                  color="primary"
                  onClick={() => {
                    this.toogleModal();
                  }}
                >
                  <i className="fa fa-pencil mr-2" />
                  editar info
                </Button>
                <Button
                  onClick={() => {
                    document.getElementById(`imput-pic-${course._id}`).click();
                  }}
                  className="mr-2"
                >
                  <i className="fa fa-pencil mr-2" />
                  editar pic
                </Button>
                <Link
                  className="btn btn-success mr-2"
                  to={"/edit/" + course.course_short_link}
                >
                  <i className="fa fa-pencil mr-2" />
                  editar items
                </Link>
                <Button
                  className="mr-2"
                  color="warning"
                  onClick={() => {
                    shell.openExternal(
                      `${pageUrl}/${course.course_short_link}`
                    );
                  }}
                >
                  <i className="fa fa-external-link-square mr-2" />
                  probar
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>

        <input
          id={`imput-pic-${course._id}`}
          onChange={(e) =>
            this.uploadPic(e, course, (newUrl) => {
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
