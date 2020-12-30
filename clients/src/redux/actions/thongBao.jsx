import axios from "axios";
import * as types from "../constants/actionType";
import createAction from "./index";
import moment from "moment";
export const layDanhSachThongBao = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/layDanhSachThongBao")
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

export const themThongBao = (email, data) => {
  const dt = {
    email: email,
    content: data,
  };
  return (dispatch) => {
    axios
      .post("http://localhost:5000/admin/api/dangThongBao", { data: dt })
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
