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

// cu dan

export const themTKCuDan = (data) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/admin/api/themTaiKhoanCuDan", {
        data: data,
      })
      .then((res) => {
        let data = Object.assign({}, res.data[0], {
          date: new Date(res.data[0].date).toLocaleDateString("en-GB"),
          owner:
            res.data[0].Owner[0].ten + " " + res.data[0].Owner[0].hoVaTenDem,
        });
        dispatch(actAddTKCD(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const layDanhSachTKCuDan = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/layDanhSachTaiKhoanCuDan")
      .then((res) => {
        let data = res.data?.map((item) => {
          let owner = item.Owner[0].ten + " " + item.Owner[0].hoVaTenDem;
          item.date = new Date(item.date).toLocaleDateString("en-GB");
          return { ...item, owner };
        });
        dispatch(actLayDanhSachCD(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const chinhSuaTKCuDan = (data) => {
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
        console.log(_doc);
        console.log(data);
        dispatch(actEditTKCD(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const thayDoiEmailCD = (data) => {
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
        console.log(res.data);
        dispatch(actThayDoiMailCD(res.data._doc));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const xoaTKCuDan = (data) => {
  const id = data;
  return (dispatch) => {
    axios
      .delete("http://localhost:5000/admin/api/xoaTaiKhoanCuDan?id=" + id)
      .then((res) => {
        dispatch(actXoaTKCD(res.data));
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

// action tk cu dan
const actLayDanhSachCD = (data) => {
  return {
    type: types.SAVE_LIST_ACCOUNT_CD,
    payload: data,
  };
};

const actAddTKCD = (data) => {
  return {
    type: types.ADD_ACCOUNT_CD,
    payload: data,
  };
};

const actEditTKCD = (data) => {
  return {
    type: types.EDIT_ACCOUNT_CD,
    payload: data,
  };
};

const actThayDoiMailCD = (data) => {
  return {
    type: types.EMAIL_ACCOUNT_CD,
    payload: data,
  };
};

const actXoaTKCD = (data) => {
  return {
    type: types.DELETE_ACCOUNT_CD,
    payload: data,
  };
};
