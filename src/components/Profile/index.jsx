import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";

import Loading from "components/common/auth/Loading";
import Layout from "components/common/Layout";
import AuthorData from "components/Profile/AuthorData";
import { Col, Container, Row } from "reactstrap";

import { setCurrentUser } from "store/setting_store/actions";

function Profile(props) {
  const { user, setCurrentUser } = props;
  const [profile, setProfile] = useState(user);

  const handleProfileDataChanged = (_profile) => {
    const newProfile = { ...profile, ..._profile };
    setProfile(newProfile);
    setCurrentUser(newProfile);
  };

  return (
    <Layout {...props}>
      <div className="content">
        <Container>
          <Row>
            <Col xs="12" className="order-lg-2">
              <AuthorData
                profile={profile}
                handleProfileDataChanged={handleProfileDataChanged}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.settings.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
