import { createStore, combineReducers, applyMiddleware } from "redux";

import userDataReducer from "store/userData_store/reducer";
import appReducer from "store/app_store/reducer";
import paymentReports from "store/payment_report_store/reducer";
import socketio from "store/socket.io/reducer";

import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { apiUrl } from "config";

const socket = io(apiUrl);

let socketIoMiddleware = createSocketIoMiddleware(socket, "io/");

const store = createStore(
  combineReducers({
    app: appReducer,
    userData: userDataReducer,
    paymentReports: paymentReports,
    socketio: socketio,
  }),

  applyMiddleware(socketIoMiddleware)
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
