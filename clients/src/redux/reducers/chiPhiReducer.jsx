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
    /*===================================================================
                              Phieu giu xe
    ===================================================================*/
    case types.SAVE_LIST_GIU_XE:
      return Object.assign({}, state, (state.phieuGiuXe = action.payload));
    case types.ADD_GIU_XE:
      return Object.assign(
        {},
        state,
        (state.phieuGiuXe = [...state.phieuGiuXe, action.payload])
      );
    case types.EDIT_GIU_XE:
      let dtPGX = action.payload;
      let editPhieuGiuXe = state.phieuGiuXe.map((item) => {
        if (item._id === dtPGX._id) {
          item.id_canHo = dtPGX.id_canHo;
          item.noiDung = dtPGX.noiDung;
          item.tongTien = dtPGX.tongTien;
        }
        return item;
      });
      return Object.assign({}, state, (state.phieuGiuXe = editPhieuGiuXe));
    case types.DELETE_GIU_XE:
      let deletePhieuGiuXe = state.phieuGiuXe.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.phieuGiuXe = deletePhieuGiuXe));
    case types.CHECK_GIU_XE:
      let dataCheckGX = action.payload;
      let checkPhieuGiuXe = state.phieuGiuXe.map((item) => {
        if (item._id === dataCheckGX._id) {
          item.tinhTrang = dataCheckGX.tinhTrang;
        }
        return item;
      });
      return Object.assign({}, state, (state.phieuGiuXe = checkPhieuGiuXe));
    /*===================================================================
                              Phieu quan ly
    ===================================================================*/
    case types.SAVE_LIST_QUAN_LY:
      return Object.assign({}, state, (state.phieuQuanLy = action.payload));
    case types.ADD_QUAN_LY:
      return Object.assign(
        {},
        state,
        (state.phieuQuanLy = [...state.phieuQuanLy, action.payload])
      );
    case types.DELETE_QUAN_LY:
      let deletePhieuQuanLy = state.phieuQuanLy.filter(
        (item) => item._id !== action.payload._id
      );
      return Object.assign({}, state, (state.phieuQuanLy = deletePhieuQuanLy));
    case types.CHECK_QUAN_LY:
      let dataCheckQL = action.payload;
      let checkPhieuQuanLy = state.phieuQuanLy.map((item) => {
        if (item._id === dataCheckQL._id) {
          item.tinhTrang = dataCheckQL.tinhTrang;
        }
        return item;
      });
      return Object.assign({}, state, (state.phieuQuanLy = checkPhieuQuanLy));
    default:
      return state;
  }
};
