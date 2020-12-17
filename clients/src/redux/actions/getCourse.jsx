import { GET_CORSE_LIST } from "../constants/actionType";
const axios = require("axios").default;

export const saveList = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/test")
      .then((res) => {
        console.log(res.data);
        dispatch(actGetCorseList(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actGetCorseList = (danhSachKhoaHoc) => {
  return {
    type: GET_CORSE_LIST,
    payload: danhSachKhoaHoc,
  };
};
