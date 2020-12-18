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
    case types.EDIT_ACCOUNT:
      let newData = state.danhSachTaiKhoan.map((item) => {
        let data = action.payload;
        if (action.payload._id === item._id) {
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
    default:
      return state;
  }
};
