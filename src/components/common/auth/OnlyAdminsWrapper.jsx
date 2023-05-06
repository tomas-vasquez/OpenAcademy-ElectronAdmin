import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux"; // import { useFirestore, useFirestoreDocData, useUser } from "reactfire";

import Intruder from "./Intruder";
import Loading from "./Loading";

import FirebaseContext from "context/FirebaseContext";
import { doc, getDoc } from "firebase/firestore";

function OnlyAdminsWrapper(props) {
  const { children, user } = props;
  const firebase = useContext(FirebaseContext);

  const [isComplete, setIsComplete] = useState(false);
  const [credential, setCredential] = useState(null);

  const myFunction = async () => {
    const db = firebase.firestore();
    const docRef = doc(db, "credentials", user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const credential = docSnap.data();
      setCredential(credential);
    } else {
      console.log(user);
    }
    setIsComplete(true);
  };

  useEffect(() => {
    myFunction();
  }, []);

  if (!isComplete) return <Loading texto="verifying credentials....." />;

  if (!credential.role) {
    return <Intruder />;
  } else {
    return children;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.settings.user,
  };
};

export default connect(mapStateToProps)(OnlyAdminsWrapper);
