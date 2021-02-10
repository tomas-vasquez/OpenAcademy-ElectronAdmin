import Footer from "components/common/Footer";
import Logo from "components/common/Logo";
import React from "react";
import FirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuth } from "reactfire";

import { Card, CardBody, Col, Row } from "reactstrap";

export default function Login() {
  const auth = useAuth;
  const uiConfig = {
    queryParameterForSignInSuccessUrl: "signInSuccessUrl",
    signInFlow: "popup",
    signInOptions: [
      auth.EmailAuthProvider.PROVIDER_ID,
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <div className="main-content">
      <Logo />
      <div
        className="container d-flex"
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Card className="m-auto p-4">
          <CardBody>
            <Row>
              <Col lg="6" className="d-none d-lg-flex px-5">
                <img
                  className="mx-auto"
                  src={require("assets/svgs/undraw_secure_login_pdn4.svg")}
                  alt=""
                  style={{ maxWidth: "400px" }}
                />
              </Col>
              <Col xs="12" lg="6" className="p-4 text-center">
                <h1 className="mb-4">log in:</h1>
                <p>Please log in with one of these methods:</p>
                <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />{" "}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
