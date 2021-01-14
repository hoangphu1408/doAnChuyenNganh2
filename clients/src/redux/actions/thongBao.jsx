import axios from "axios";
import * as types from "../constants/actionType";
import createAction from "./index";
import moment from "moment";
export const layDanhSachThongBao = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/thongBao")
      .then((res) => {
        let data = res.data?.map((item) => {
          let email = item.Owner[0].email;
          item.ngayDang = moment(new Date(item.ngayDang).getTime()).format(
            "HH:mm ● DD-MM-YYYY"
          );
          return { ...item, email };
        });
        dispatch(createAction(types.SAVE_LIST_THONG_BAO, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const themThongBao = (email, data, img) => {
  const dt = {
    email: email,
    content: data,
    hinhAnh: img,
  };
  return (dispatch) => {
    axios
      .post("http://localhost:5000/admin/api/thongBao", { data: dt })
      .then((res) => {
        console.log(res.data);
        let data = Object.assign({}, res.data[0], {
          ngayDang: moment(new Date(res.data[0].ngayDang).getTime()).format(
            "HH:mm ● DD-MM-YYYY"
          ),
          email: res.data[0].Owner[0].email,
        });
        dispatch(createAction(types.ADD_THONG_BAO, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const suaThongBao = (data) => {
  const { _id } = data;
  const dt = {
    content: data.noiDung,
    hinhAnh: data.hinhAnh,
  };
  return (dispatch) => {
    axios
      .put("http://localhost:5000/admin/api/thongBao?id=" + _id, {
        data: dt,
      })
      .then((res) => {
        console.log("sv:", res.data);
        let data = Object.assign({}, res.data[0], {
          ngayDang: moment(new Date(res.data[0].ngayDang).getTime()).format(
            "HH:mm ● DD-MM-YYYY"
          ),
          email: res.data[0].Owner[0].email,
        });
        dispatch(createAction(types.EDIT_THONG_BAO, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkThongBao = (data) => {
  const { _id, tinhTrang } = data;
  const dt = {
    tinhTrang: !tinhTrang,
  };
  return (dispatch) => {
    axios
      .put("http://localhost:5000/admin/api/checkThongBao?id=" + _id, {
        data: dt,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(types.CHECK_THONG_BAOS, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const xoaThongBao = (id) => {
  return (dispatch) => {
    axios
      .delete("http://localhost:5000/admin/api/thongBao?id=" + id)
      .then((res) => {
        dispatch(createAction(types.DELETE_THONG_BAO, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
