import Loading from "components/common/auth/Loading";
import Layout from "components/common/Layout";
import React, { useEffect, useState } from "react";
import { useFirestore, useUser } from "reactfire";

import AuthorData from "components/Profile/AuthorData";
import { Col, Container, Row } from "reactstrap";

export default function index(props) {
  const fireStore = useFirestore();
  const [profile, setProfile] = useState(null);
  const { data: user } = useUser();

  useEffect(() => {
    fireStore
      .collection("profiles")
      .doc(user.uid)
      .onSnapshot((_profile) => {
        const profile = _profile.data();
        setProfile(profile);
      });
  }, []);

  if (!profile) return <Loading texto="Loading profile..." />;

  return (
    <Layout {...props}>
      <div className="content">
        <Container>
          <Row>
            <Col xs="12" className="order-lg-2">
              <AuthorData profile={profile} />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
