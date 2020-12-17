import * as types from "../constants/actionType";
let initialState = {
  danhSachCuDan: [],
};

export const residentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_LIST_RESIDENT:
      // return {
      //   ...state,
      //   danhSachCuDan: [...state.danhSachCuDan, action.payload],
      // };
      return Object.assign({}, state, (state.danhSachCuDan = action.payload));
    case types.ADD_RESIDENT:
      return Object.assign(
        {},
        state,
        (state.danhSachCuDan = [...state.danhSachCuDan, action.payload])
      );
    case types.EDIT_RESIDENT:
      let newData = state.danhSachCuDan.map((item) => {
        let data = action.payload;
        if (action.payload._id === item._id) {
          item._id = data._id;
          item.ten = data.ten;
          item.hoVaTenDem = data.hoVaTenDem;
          item.namSinh = data.namSinh;
          item.gioiTinh = data.gioiTinh;
          item.canCuocCongDan = data.canCuocCongDan;
          item.hoKhau = data.hoKhau;
          item.date = data.date;
        }
        return item;
      });
      return Object.assign({}, state, (state.danhSachCuDan = newData));
    case types.DELETE_RESIDENT:
      let deleteData = state.danhSachCuDan.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.danhSachCuDan = deleteData));
    default:
      return state;
  }
};
