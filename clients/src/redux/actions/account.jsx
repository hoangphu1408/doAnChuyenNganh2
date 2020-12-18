import * as types from "../constants/actionType";
import axios from "axios";

export const layDanhSachTaiKhoan = () => {
  axios
    .get("http://localhost:5000/admin/api/layDanhSachTaiKhoanQuanTri")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const actLayDanhSach = (data) => {
  return {
    type: types.SAVE_LIST_ACCOUNT,
    payload: data,
  };
};
