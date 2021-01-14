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
    case types.EDIT_THONG_BAO:
      let data = action.payload;
      let newData = state.danhSachThongBao.map((item) => {
        if (action.payload._id === item._id) {
          item.noiDung = data.noiDung;
          item.hinhAnh = data.hinhAnh;
        }
        return item;
      });
      return Object.assign({}, state, (state.danhSachThongBao = newData));
    case types.CHECK_THONG_BAOS:
      let dataCheck = action.payload;
      let checkThongBao = state.danhSachThongBao.map((item) => {
        if (item._id === dataCheck._id) {
          item.tinhTrang = dataCheck.tinhTrang;
        }
        return item;
      });
      return (state.danhSachThongBao = checkThongBao);
    case types.DELETE_THONG_BAO:
      let deleteData = state.danhSachThongBao.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.danhSachThongBao = deleteData));
    default:
      return state;
  }
};
