import React from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import Intruder from "./Intruder";
import Loading from "./Loading";

export default function OnlyAdminsWrapper({ children }) {
  const { data: user } = useUser();
  const credentialsRef = useFirestore();

  let { isComplete, data: credential, hasEmitted } = useFirestoreDocData(
    credentialsRef.collection("credentials").doc(user?.uid)
  );

  if (!isComplete && !hasEmitted)
    return <Loading texto="verificando credenciales....." />;

  if (!credential.role) {
    return <Intruder />;
  } else {
    return children;
  }
}
