import { createRoot } from "react-dom/client";

import "./assets/css/black-dashboard-react.min.css";
import "./assets/css/myStyles.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App";

//firebase
import FirebaseContext from "context/FirebaseContext";
import myFirebase from "./myFirebase";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <FirebaseContext.Provider value={myFirebase}>
    <App />
  </FirebaseContext.Provider>
);
