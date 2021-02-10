import { createStore, combineReducers, applyMiddleware } from "redux";

import userDataReducer from "store/userData_store/reducer";
import appReducer from "store/app_store/reducer";
import paymentReports from "store/payment_report_store/reducer";
import courseStore from "store/courses_store/reducer";
import userStore from "store/users_store/reducer";

import logger from "redux-logger";
// import io from "socket.io-client";
// import { apiUrl } from "config";
// import DB from "helpers/DB";

// const socket = io(apiUrl, {
//   query: "token=" + DB.get("api-token"),
//   agent: "adminer",
// });

// require("../socket")(socket);

// let socketIoMiddleware = createSocketIoMiddleware(socket, "action/");

const store = createStore(
  combineReducers({
    app: appReducer,
    userData: userDataReducer,
    paymentReports: paymentReports,
    courses: courseStore,
    users: userStore,
  }),
  applyMiddleware(logger)
);

store.log = () => {
  console.log(
    "  %c Store > %c estado:%c",
    "background:green; color:white",
    "background:#b6ffa7",
    "",
    store.getState()
  );
};

export default store;
