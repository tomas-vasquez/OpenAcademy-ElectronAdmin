import React, { useContext } from "react";
import { connect } from "react-redux";

import SocialButtons from "components/common/SocialButtons";
import Alerts from "helpers/Alerts";
import { cropToProfilePic } from "helpers/image";

import {
  Col,
  CardBody,
  Container,
  Row,
  Card,
  UncontrolledTooltip,
} from "reactstrap";
import { getShortLink } from "helpers/courses";
import FirebaseContext from "context/FirebaseContext";

const ProfileCard = (props) => {
  const { user, profile, editable, handleProfileDataChanged } = props;
  const firebase = useContext(FirebaseContext);

  const firestore = firebase.firestore();
  const storage = firebase.storage();

  const handlePicPicker = (e) => {
    const file = e.target.files[0];

    cropToProfilePic(file, (blob) => {
      var fileName =
        new Date().getMilliseconds() + "-" + getShortLink(profile.user_name);
      const newRef = storage.ref("user-pics").child(fileName);

      newRef.put(blob).then(() => {
        newRef.getDownloadURL().then((url) => {
          firestore
            .collection("profiles")
            .doc(user.uid)
            .set({ ...profile, user_pic: url })
            .then(() => {
              handleProfileDataChanged({ ...profile, user_pic: url });
              Alerts.showToast("perfil Actualizado");
            });
        });
      });
    });
    Alerts.showLoading();
  };

  return (
    <Card className="shadow-md mb-4">
      <CardBody>
        <Container>
          <Row>
            <Col xs="12" lg="4" className="order-lg-2 mx-auto d-flex">
              <img
                src={profile.user_pic ? profile.user_pic : "/images/noPic.jpg"}
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                  width: 150,
                  height: 150,
                }}
                className="m-auto"
                id="image-123"
                onClick={() => {
                  if (editable) {
                    document.getElementById("input-pic").click();
                  } else {
                    alert("nooo");
                  }
                }}
                alt={profile.name}
              />
            </Col>
            <Col xs="12" lg="8" className="order-lg-1">
              <h2 className="mb-0">{profile.user_name || "No definido"}</h2>
              <small className="mb-3 text-muted">
                <small>ID: {profile.id}</small>
              </small>
              <p>{profile.description || "no definido"}</p>

              <div className="d-flex mt-2">
                <SocialButtons data={profile} />
              </div>
            </Col>
          </Row>
        </Container>
      </CardBody>
      <UncontrolledTooltip delay={0} target="image-123">
        cambiar imagen
      </UncontrolledTooltip>
      <input
        className="d-none"
        id="input-pic"
        type="file"
        accept="image/*"
        onChange={handlePicPicker}
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.settings.user,
  };
};

export default connect(mapStateToProps)(ProfileCard);
