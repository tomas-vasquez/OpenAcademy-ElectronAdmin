import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  Container,
  Input,
  Modal,
  Row,
} from "reactstrap";

import { PreviewPc } from "react-preview-images";
import "react-preview-images/dist/main.css";
import SocialButtons from "components/common/SocialButtons";
// import Controller_Profile from "fetchers/Profile";
// const { shell } = window.require("electron");

function ModalPreviewReport({ isOpen, toggle, currentReport, courses, users }) {
  const [visible, setVisible] = React.useState(false);

  const report_subject = courses
    ? courses.find((course) => {
        return course._id === currentReport.report_subject._id;
      })
    : null;

  const profile = users?.find(
    (user) => user._id === currentReport.report_sender_id
  );

  // useEffect(() => {
  //   if (!profile)
  //     new Controller_Profile().getProfile(currentReport.report_sender_id);
  // });

  const getPicUrl = (profile) => {
    if (profile.pic_url) {
      return profile.pic_url;
    } else {
      return "/img/noPic.jpg";
    }
  };

  return (
    <>
      <Modal isOpen={isOpen && !visible} className="modal-lg">
        <Card
          className="m-0"
          style={{
            border: "1px solid #344675",
            boxShadow: "0 1px 20px 0px #3446757a",
          }}
        >
          <CardHeader className="d-flex" style={{ cursor: "pointer" }}>
            <CardTitle tag="h4">
              <i className="fa fa-dollar mr-2" />
              payment report
            </CardTitle>
            <CardTitle tag="h4" className="mb-0 ml-auto" onClick={toggle}>
              <i className="fa fa-times" />
            </CardTitle>
          </CardHeader>

          <CardBody>
            <label className="h6">product:</label>
            {courses ? (
              <Card
                className="mb-4 shadow"
                style={{
                  border: "1px solid #344675",
                  boxShadow: "0 1px 20px 0px #3446757a",
                }}
              >
                <CardBody>
                  <Row>
                    <Col xs="auto">
                      {report_subject.course_pic_url ? (
                        <CardImg
                          style={{ width: 200 }}
                          src={report_subject.course_pic_url}
                        />
                      ) : (
                        <CardImg
                          style={{ width: 200, height: 120 }}
                          src={require("assets/img/noPic.png")}
                        />
                      )}
                    </Col>
                    <Col>
                      <h3 className="m-0">{report_subject.course_title}</h3>
                      <span>{`ID:${report_subject._id}`}</span>
                      <p>{report_subject.course_description}</p>
                      <div className="d-flex ml-auto">
                        <Button
                          className="mr-2"
                          color="success"
                          // onClick={() => {
                          //   shell.openExternal(
                          //     `${pageUrl}/${report_subject.course_short_link}`
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
              </Card>
            ) : (
              <div className="d-flex">
                <p size="md" className="mx-auto">
                  Cargando....
                </p>
              </div>
            )}
            <label className="h6">Seender:</label>
            {profile ? (
              <Card
                className="mb-4 shadow"
                style={{
                  border: "1px solid #344675",
                  boxShadow: "0 1px 20px 0px #3446757a",
                }}
              >
                <CardBody>
                  <Container>
                    <Row>
                      <Col lg="3" className="mx-auto d-flex">
                        <div className="m-auto d-flex">
                          <img
                            src={getPicUrl(profile)}
                            style={{
                              borderRadius: "50%",
                              cursor: "pointer",
                              width: 80,
                              height: 80,
                            }}
                            className="m-auto"
                            id="image-123"
                            alt={profile.name}
                          />
                        </div>
                      </Col>
                      <Col lg="9">
                        <h3 className="m-0">{profile.name || "No definido"}</h3>
                        <span>ID:{profile._id}</span>
                        <p>{profile.description || "no definido"}</p>
                        <p>
                          <SocialButtons data={profile} />
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            ) : (
              <div className="d-flex">
                <p size="md" className="mx-auto">
                  Cargando....
                </p>
              </div>
            )}
            <hr />
            <label className="h6">images received:</label>
            <Container>
              <Row>
                {currentReport.report_images.map((pic, index) => (
                  <Col xs="4" key={index}>
                    <div className="text-right">
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <CardImg
                          style={{
                            cursor: "pointer",
                          }}
                          src={pic.url}
                          onClick={() => setVisible(true)}
                        />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>

            <label className="h6 mt-5">payment description:</label>

            <Input
              className="text-white"
              type="textarea"
              disabled
              value={currentReport.report_description}
            />
          </CardBody>

          <CardFooter className="text-right">
            <Button color="success">aprove</Button>
            <Button color="danger">decline</Button>
          </CardFooter>
        </Card>
      </Modal>

      <PreviewPc
        visible={visible}
        title="Payment report images:"
        list={currentReport.report_images.map((pic) => {
          return pic.url;
        })}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}

export default ModalPreviewReport;
