import * as types from "../constants/actionType";

const initialState = {
  chiPhi: [],
  phieuNuoc: [],
  phieuGiuXe: [],
  phieuQuanLy: [],
};

export const chiPhiReducer = (state = initialState, action) => {
  switch (action.type) {
    /*===================================================================
                              Chi Phi
    ===================================================================*/
    case types.SAVE_LIST_CHI_PHI:
      return Object.assign({}, state, (state.chiPhi = action.payload));
    case types.ADD_CHI_PHI:
      return Object.assign(
        {},
        state,
        (state.chiPhi = [...state.chiPhi, action.payload])
      );
    case types.EDIT_CHI_PHI:
      let data = action.payload;
      let newData = state.chiPhi.map((item) => {
        if (data._id === item._id) {
          item.maChiPhi = data.maChiPhi;
          item.tenLoaiChiPhi = data.tenLoaiChiPhi;
          item.giaTien = data.giaTien;
        }
        return item;
      });
      return Object.assign({}, state, (state.chiPhi = newData));
    case types.DELETE_CHI_PHI:
      let deleteData = state.chiPhi.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.chiPhi = deleteData));
    /*===================================================================
                              Phieu nuoc
    ===================================================================*/
    case types.SAVE_LIST_PHIEU_NUOC:
      return Object.assign({}, state, (state.phieuNuoc = action.payload));
    case types.ADD_PHIEU_NUOC:
      return Object.assign(
        {},
        state,
        (state.phieuNuoc = [...state.phieuNuoc, action.payload])
      );
    case types.EDIT_PHIEU_NUOC:
      let dtPN = action.payload;
      let editPhieuNuoc = state.phieuNuoc.map((item) => {
        if (item._id === dtPN._id) {
          item.id_canHo = dtPN.id_canHo;
          item.noiDung = dtPN.noiDung;
          item.tongTien = dtPN.tongTien;
        }
        return item;
      });
      return Object.assign({}, state, (state.phieuNuoc = editPhieuNuoc));
    case types.DELETE_PHIEU_NUOC:
      let deletePhieuNuoc = state.phieuNuoc.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.phieuNuoc = deletePhieuNuoc));
    case types.CHECK_PHIEU_NUOC:
      let dataCheck = action.payload;
      let checkPhieuNuoc = state.phieuNuoc.map((item) => {
        if (item._id === dataCheck._id) {
          item.tinhTrang = dataCheck.tinhTrang;
        }
        return item;
      });
      return Object.assign({}, state, (state.phieuNuoc = checkPhieuNuoc));
    default:
      return state;
  }
};
