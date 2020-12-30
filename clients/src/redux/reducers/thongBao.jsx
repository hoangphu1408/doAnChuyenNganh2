import * as types from "../constants/actionType";
const initialState = {
  danhSachThongBao: [],
};

export const thongBaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_LIST_THONG_BAO:
      return Object.assign(
        {},
        state,
        (state.danhSachThongBao = action.payload)
      );
    case types.ADD_THONG_BAO:
      return Object.assign(
        {},
        state,
        (state.danhSachThongBao = [...state.danhSachThongBao, action.payload])
      );
    default:
      return state;
  }
};
