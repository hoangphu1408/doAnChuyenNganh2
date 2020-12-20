import * as types from "../constants/actionType";

const initialState = {
  danhSachTaiKhoan: [],
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
          item.email = email.email;
        }
        return item;
      });
      return Object.assign({}, state, (state.danhSachTaiKhoan = newEmail));
    case types.DELETE_ACCOUNT:
      let deleteData = state.danhSachTaiKhoan.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.danhSachTaiKhoan = deleteData));
    default:
      return state;
  }
};
