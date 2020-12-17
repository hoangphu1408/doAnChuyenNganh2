//import * as types from "../constants/actionType";
import * as actions from "./isRegister";
import history from "../../routes/history";
import socket from "../../routes/socket";
const axios = require("axios").default;

export const actLogin = (data) => {
  const dt = {
    email: data.email,
    password: data.password,
  };
  return (dispatch) => {
    axios
      .post("http://localhost:5000/login", {
        data: dt,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error_login !== undefined) {
          dispatch(actions.addErrMsg(res.data));
        } else {
          // const socket = io('http://localhost:5000/');
          socket.emit("set-email", res.data.account.email);
          dispatch(actions.reset());
          localStorage.setItem("isLogin", true);
          localStorage.setItem("token", res.data.signToken);
          history.push("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
