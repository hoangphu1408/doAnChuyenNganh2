import * as types from "../constants/actionType";
// import history from "../../routes/history";
// import socket from "../../routes/socket";
const axios = require("axios").default;

export const themCuDan = (data) => {
  const dt = {
    ten: data.ten,
    hoVaTenDem: data.hoVaTenDem,
    namSinh: data.namSinh,
    gioiTinh: data.gioiTinh,
    canCuocCongDan: data.canCuocCongDan,
    hoKhau: data.hoKhau,
  };
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/admin/api/themCuDan`, {
        data: dt,
      })
      .then((res) => {
        let data = Object.assign({}, res.data, {
          date: new Date(res.data.namSinh).toLocaleDateString("en-GB"),
        });
        dispatch(actAdding(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const suaCuDan = (data) => {
  const dt = {
    ten: data.ten,
    hoVaTenDem: data.hoVaTenDem,
    namSinh: data.namSinh,
    gioiTinh: data.gioiTinh,
    canCuocCongDan: data.canCuocCongDan,
    hoKhau: data.hoKhau,
  };
  let id = data._id;
  return (dispatch) => {
    axios
      .put(`http://localhost:5000/admin/api/suaCuDan?id=` + id, {
        data: dt,
      })
      .then((res) => {
        let data = Object.assign({}, res.data, {
          date: new Date(res.data.namSinh).toLocaleDateString("en-GB"),
        });
        dispatch(actEdit(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const xoaCuDan = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:5000/admin/api/xoaCuDan?id=` + id)
      .then((res) => {
        dispatch(actDelete(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const luuDanhSachCuDan = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/layDanhSachCuDan")
      .then((res) => {
        let data = res.data?.map((item) => {
          let date = new Date(item.namSinh).toLocaleDateString("en-GB");
          return { ...item, date };
        });
        console.log("data", data);
        dispatch(actSave(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
// action

const actAdding = (resident) => {
  return {
    type: types.ADD_RESIDENT,
    payload: resident,
  };
};

const actSave = (listResident) => {
  return {
    type: types.SAVE_LIST_RESIDENT,
    payload: listResident,
  };
};

const actEdit = (data) => {
  return {
    type: types.EDIT_RESIDENT,
    payload: data,
  };
};

const actDelete = (data) => {
  return {
    type: types.DELETE_RESIDENT,
    payload: data,
  };
};
