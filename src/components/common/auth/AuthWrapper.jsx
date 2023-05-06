import React, { useEffect, useState } from "react";
import SignOut from "context/singout";
import Loading from "./Loading";
import Login from "./Login";

import firebase from "myFirebase";

import { setCurrentUser, deleteCurrentUser } from "store/setting_store/actions";
import { connect } from "react-redux";

function AuthWrapper(props) {
  const { children, user, setCurrentUser, deleteCurrentUser } = props;

  const [isComplete, setIsComplete] = useState(false);

  var signOut = () => {
    const auth = app.auth();
    auth.signOut();
  };

  useEffect(() => {
    const auth = firebase.auth();
    const firestore = firebase.firestore();

    auth.onAuthStateChanged(() => {
      let currentUser = auth.currentUser;
      if (currentUser) {
        firestore
          .collection("profiles")
          .doc(currentUser.uid)
          .onSnapshot((_profile) => {
            const profile = _profile.data();
            setCurrentUser({ ...profile });
            setIsComplete(true);
          });
      } else {
        deleteCurrentUser();
        setIsComplete(true);
      }
    });
  }, []);

  if (!isComplete) return <Loading texto="loading...." />;

  if (user) {
    return <SignOut.Provider value={signOut}>{children}</SignOut.Provider>;
  } else {
    return <Login />;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.settings.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    deleteCurrentUser: () => dispatch(deleteCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
