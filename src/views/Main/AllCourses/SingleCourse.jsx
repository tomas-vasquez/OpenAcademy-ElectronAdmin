import React from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  Input,
  Col,
  Row,
  CardImg,
} from "reactstrap";
import { coursePicsUrl } from "config";

export default function SingleCourse({ course, setCurrentView }) {
  return (
    <Card className="mb-4">
      <CardBody>
        <Row>
          <Col xs="auto">
            <CardImg
              style={{ width: 200 }}
              src={coursePicsUrl + course.course_pic_url}
            />
          </Col>
          <Col>
            <h3>{course.course_title}</h3>
            <p>{course.course_description}</p>
            <div className="d-flex ml-auto">
              <ButtonGroup>
                <Button
                  color="primary"
                  onClick={() => {
                    setCurrentView("editcourse", course);
                  }}
                >
                  <i className="fa fa-pencil mr-2" />
                  editar
                </Button>
                <Button color="success">
                  <i className="fa fa-pencil mr-2" />
                </Button>
                <Button color="warning">
                  <i className="fa fa-external-link-square mr-2" />
                  ver en el navegador
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
