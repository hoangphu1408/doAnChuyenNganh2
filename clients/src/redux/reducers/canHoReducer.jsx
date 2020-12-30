import * as types from "../constants/actionType";

const initialState = {
  danhSachCanHo: [],
};

export const canHoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_LIST_CAN_HO:
      return Object.assign({}, state, (state.danhSachCanHo = action.payload));
    case types.ADD_CAN_HO:
      return Object.assign(
        {},
        state,
        (state.danhSachCanHo = [...state.danhSachCanHo, action.payload])
      );
    case types.EDIT_CAN_HO:
      let data = action.payload;
      let newData = state.danhSachCanHo.map((item) => {
        if (data._id === item._id) {
          item.soCanHo = data.soCanHo;
          item.soTang = data.soTang;
          item.maToaNha = data.maToaNha;
          item.chieuDai = data.chieuDai;
          item.chieuRong = data.chieuRong;
          item.dienTich = data.dienTich;
          item.tinhTrang = data.tinhTrang;
          item._chuSoHuu = data._chuSoHuu;
          item.chuSoHuu = data.chuSoHuu;
          item.Owner = data.Owner;
        }
        return item;
      });
      return Object.assign({}, state, (state.danhSachCanHo = newData));
    case types.DELETE_CAN_HO:
      let deleteData = state.danhSachCanHo.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.danhSachCanHo = deleteData));
    default:
      return state;
  }
};
