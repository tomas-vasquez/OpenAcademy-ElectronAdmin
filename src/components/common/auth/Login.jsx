import Footer from "components/common/Footer";
import Logo from "components/common/Logo";
import Alerts from "helpers/Alerts";
import React, { useContext } from "react";
import FirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Card, CardBody, Col, Row } from "reactstrap";
import svgUrl from "assets/svgs/undraw_secure_login_pdn4.svg";
import FirebaseContext from "context/FirebaseContext";

export default function Login() {
  const firebase = useContext(FirebaseContext);

  const fireStore = firebase.fireStore;

  const buildNewProfile = (user) => {
    let newProfile = {
      id: user.uid,
      user_pic: user.photoURL,
      user_name: user.displayName,
    };

    fireStore
      .collection("profiles")
      .doc(user.uid)
      .set(newProfile)
      .then(() => {
        Alerts.showToast("your new profile was created!");
      });
  };

  const auth = firebase.auth;
  const uiConfig = {
    queryParameterForSignInSuccessUrl: "signInSuccessUrl",
    signInFlow: "popup",
    signInOptions: [
      auth.EmailAuthProvider.PROVIDER_ID,
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthRe3sult: (data) => {
        const { user } = data;

        fireStore
          .collection("profiles")
          .doc(user.uid)
          .get()
          .then((_profile) => {
            const profile = _profile.data();
            if (!profile) buildNewProfile(user);
          });
      },
    },
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
        {/* {JSON.stringify(user)} */}
        <Card className="m-auto p-4">
          <CardBody>
            <Row>
              <Col lg="6" className="d-none d-lg-flex px-5">
                <img
                  className="mx-auto"
                  src={svgUrl}
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
