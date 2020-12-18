import * as types from "../constants/actionType";
import axios from "axios";

export const layDanhSachTaiKhoan = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/layDanhSachTaiKhoanQuanTri")
      .then((res) => {
        dispatch(actLayDanhSach(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const chinhSuaTaiKhoan = (data) => {
  const id = data._id;
  return (dispatch) => {
    axios
      .put("http://localhost:5000/admin/api/suaTaiKhoanQuanTri?id=" + id, {
        data: data,
      })
      .then((res) => {
        console.log(res.data);
        //dispatch(actEditTaiKhoan(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const actLayDanhSach = (data) => {
  return {
    type: types.SAVE_LIST_ACCOUNT,
    payload: data,
  };
};

const actEditTaiKhoan = (data) => {
  return {
    type: types.EDIT_ACCOUNT,
    payload: data,
  };
};
