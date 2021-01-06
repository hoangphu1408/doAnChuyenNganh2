import * as types from "../constants/actionType";
const initalState = {
  tienXeTTuan: [],
  tienXeTThang: [],
  tienXeTNam: [],
  tienNuocTTuan: [],
  tienNuocTThang: [],
  tienNuocTNam: [],
  tienQuanLyTTuan: [],
  tienQuanLyTThang: [],
  tienQuanLyTNam: [],
};
export const thongKeReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_TX_THEO_TUAN:
      return Object.assign({}, state, (state.tienXeTTuan = action.payload));
    case types.GET_TX_THEO_THANG:
      return Object.assign({}, state, (state.tienXeTThang = action.payload));
    case types.GET_TX_THEO_NAM:
      return Object.assign({}, state, (state.tienXeTNam = action.payload));
    case types.GET_NUOC_THEO_TUAN:
      return Object.assign({}, state, (state.tienNuocTTuan = action.payload));
    case types.GET_NUOC_THEO_THANG:
      return Object.assign({}, state, (state.tienNuocTThang = action.payload));
    case types.GET_NUOC_THEO_NAM:
      return Object.assign({}, state, (state.tienNuocTNam = action.payload));
    case types.GET_QL_THEO_TUAN:
      return Object.assign({}, state, (state.tienQuanLyTTuan = action.payload));
    case types.GET_QL_THEO_THANG:
      return Object.assign(
        {},
        state,
        (state.tienQuanLyTThang = action.payload)
      );
    case types.GET_QL_THEO_NAM:
      return Object.assign({}, state, (state.tienQuanLyTNam = action.payload));
    default:
      return state;
  }
};
