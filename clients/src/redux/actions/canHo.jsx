import * as types from "../constants/actionType";
import createAction from "./index";
import axios from "axios";

export const saveListCanHO = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/layDanhSachCanHo")
      .then((res) => {
        let data = res.data?.map((item) => {
          if (item.Owner.length > 0) {
            let _chuSoHuu = item.Owner[0].ten + " " + item.Owner[0].hoVaTenDem;
            return { ...item, _chuSoHuu };
          }
          let _chuSoHuu = "Trống";
          return { ...item, _chuSoHuu };
        });
        dispatch(createAction(types.SAVE_LIST_CAN_HO, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const themCanHo = (data) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/admin/api/themCanHo", {
        data: data,
      })
      .then((res) => {
        let _chuSoHuu;
        if (res.data[0].Owner.length > 0) {
          _chuSoHuu =
            res.data[0].Owner[0].ten + " " + res.data[0].Owner[0].hoVaTenDem;
        }
        _chuSoHuu = "Trống";
        let data = Object.assign({}, res.data[0], {
          _chuSoHuu,
        });
        dispatch(createAction(types.ADD_CAN_HO, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const chinhSuaCanHo = (data) => {
  const { _id } = data;
  return (dispatch) => {
    axios
      .put("http://localhost:5000/admin/api/chinhSuaCanHo?id=" + _id, {
        data: data,
      })
      .then((res) => {
        let _chuSoHuu;
        if (res.data[0].Owner.length > 0) {
          _chuSoHuu =
            res.data[0].Owner[0].ten + " " + res.data[0].Owner[0].hoVaTenDem;
        }
        _chuSoHuu = "Trống";
        let data = Object.assign({}, res.data[0], {
          _chuSoHuu,
        });
        console.log(res.data);
        dispatch(createAction(types.EDIT_CAN_HO, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const xoaCanHo = (data) => {
  const id = data;
  return (dispatch) => {
    axios
      .delete("http://localhost:5000/admin/api/xoaCanHo?id=" + id)
      .then((res) => {
        dispatch(createAction(types.DELETE_CAN_HO, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
