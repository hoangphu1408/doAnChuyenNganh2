import * as types from "../constants/actionType";
import axios from "axios";

export const themTaiKhoan = (data) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/admin/api/taoTaiKhoanQuanTri", {
        data: data,
      })
      .then((res) => {
        let data = Object.assign({}, res.data, {
          date: new Date(res.data.date).toLocaleDateString("en-GB"),
        });
        dispatch(actThemTaiKhoan(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const layDanhSachTaiKhoan = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/layDanhSachTaiKhoanQuanTri")
      .then((res) => {
        let data = res.data?.map((item) => {
          let date = new Date(item.date).toLocaleDateString("en-GB");
          return { ...item, date };
        });
        dispatch(actLayDanhSach(data));
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
        const { _doc } = res.data;
        let data = Object.assign({}, _doc, {
          date: new Date(_doc.date).toLocaleDateString("en-GB"),
        });
        dispatch(actEditTaiKhoan(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const thayDoiEmail = (data) => {
  const id = data._id;
  const dt = {
    email: data.edit_email,
  };
  return (dispatch) => {
    axios
      .put("http://localhost:5000/admin/api/thayDoiEmailTaiKhoan?id=" + id, {
        data: dt,
      })
      .then((res) => {
        dispatch(actThayDoiMail(res.data._doc));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const thayDoiMatKhau = (data) => {
  const id = data._id;
  const dt = {
    password: data.password,
  };
  return (dispatch) => {
    axios
      .put("http://localhost:5000/admin/api/thayDoiMatKhauTaiKhoan?id=" + id, {
        data: dt,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
};

export const xoaTaiKhoan = (data) => {
  const id = data;
  return (dispatch) => {
    axios
      .delete("http://localhost:5000/admin/api/xoaTaiKhoanQuanTri?id=" + id)
      .then((res) => {
        dispatch(actDeleteTaiKhoan(res.data));
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

const actThemTaiKhoan = (data) => {
  return {
    type: types.ADD_ACCOUNT,
    payload: data,
  };
};

const actEditTaiKhoan = (data) => {
  return {
    type: types.EDIT_ACCOUNT,
    payload: data,
  };
};

const actThayDoiMail = (data) => {
  return {
    type: types.EMAIL_ACCOUNT,
    payload: data,
  };
};

const actDeleteTaiKhoan = (data) => {
  return {
    type: types.DELETE_ACCOUNT,
    payload: data,
  };
};
