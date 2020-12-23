import * as types from "../constants/actionType";

const initialState = {
  danhSachTaiKhoan: [],
  danhSachTaiKhoanCuDan: [],
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_LIST_ACCOUNT:
      return Object.assign(
        {},
        state,
        (state.danhSachTaiKhoan = action.payload)
      );
    case types.ADD_ACCOUNT:
      return Object.assign(
        {},
        state,
        (state.danhSachTaiKhoan = [...state.danhSachTaiKhoan, action.payload])
      );
    case types.EDIT_ACCOUNT:
      let data = action.payload;
      let newData = state.danhSachTaiKhoan.map((item) => {
        if (data._id === item._id) {
          item._id = data._id;
          item.email = data.email;
          item.email_verify = data.email_verify;
          item.role = data.role;
          item.status = data.status;
          item.date = data.date;
        }
        return item;
      });
      return Object.assign({}, state, (state.danhSachTaiKhoan = newData));
    case types.EMAIL_ACCOUNT:
      let email = action.payload;
      let newEmail = state.danhSachTaiKhoan.map((item) => {
        if (email._id === item._id) {
          item.email = email;
        }
        return item;
      });
      return Object.assign({}, state, (state.danhSachTaiKhoan = newEmail));
    case types.DELETE_ACCOUNT:
      let deleteData = state.danhSachTaiKhoan.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.danhSachTaiKhoan = deleteData));
    // Action tai khoan cu dan
    case types.SAVE_LIST_ACCOUNT_CD:
      return Object.assign(
        {},
        state,
        (state.danhSachTaiKhoanCuDan = action.payload)
      );
    case types.ADD_ACCOUNT_CD:
      return Object.assign(
        {},
        state,
        (state.danhSachTaiKhoanCuDan = [
          ...state.danhSachTaiKhoanCuDan,
          action.payload,
        ])
      );
    case types.EDIT_ACCOUNT_CD:
      let data_cd = action.payload;
      let newData_cd = state.danhSachTaiKhoanCuDan.map((item) => {
        if (data_cd._id === item._id) {
          item._id = data_cd._id;
          item.email = data_cd.email;
          item.email_verify = data_cd.email_verify;
          item.role = data_cd.role;
          item.status = data_cd.status;
          item.date = data_cd.date;
        }
        return item;
      });
      return Object.assign(
        {},
        state,
        (state.danhSachTaiKhoanCuDan = newData_cd)
      );
    case types.EMAIL_ACCOUNT_CD:
      let email_cd = action.payload;
      let newEmail_cd = state.danhSachTaiKhoanCuDan.map((item) => {
        if (email_cd._id === item._id) {
          item.email = email_cd.email;
        }
        return item;
      });
      return Object.assign(
        {},
        state,
        (state.danhSachTaiKhoanCuDan = newEmail_cd)
      );
    case types.DELETE_ACCOUNT_CD:
      let deleteData_cd = state.danhSachTaiKhoanCuDan.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign(
        {},
        state,
        (state.danhSachTaiKhoanCuDan = deleteData_cd)
      );
    default:
      return state;
  }
};
