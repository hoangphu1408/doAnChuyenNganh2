import * as types from "../constants/actionType";
import axios from "axios";
import createAction from "./index";
import moment from "moment";

/*=================================================================================================== 
                                            CHI PHI
===================================================================================================*/

export const getDanhSachChiPhi = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/chi-phi")
      .then((res) => {
        dispatch(createAction(types.SAVE_LIST_CHI_PHI, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const themChiPhi = (data) => {
  let dt = {
    maChiPhi: data.maChiPhi,
    tenLoaiChiPhi: data.tenLoaiChiPhi,
    giaTien: data.giaTien,
  };
  return (dispatch) => {
    axios
      .post("http://localhost:5000/admin/api/chi-phi", {
        data: dt,
      })
      .then((res) => {
        dispatch(createAction(types.ADD_CHI_PHI, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const suaChiPhi = (data) => {
  let { _id } = data;
  let dt = {
    maChiPhi: data.maChiPhi,
    tenLoaiChiPhi: data.tenLoaiChiPhi,
    giaTien: data.giaTien,
  };
  return (dispatch) => {
    axios
      .put("http://localhost:5000/admin/api/chi-phi?id=" + _id, {
        data: dt,
      })
      .then((res) => {
        dispatch(createAction(types.EDIT_CHI_PHI, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const xoaChiPhi = (data) => {
  let id = data;
  return (dispatch) => {
    axios
      .delete("http://localhost:5000/admin/api/chi-phi?id=" + id)
      .then((res) => {
        dispatch(createAction(types.DELETE_CHI_PHI, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

/*=================================================================================================== 
                                            PHIEU NUOC
===================================================================================================*/

export const getDanhSachPhieuNuoc = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/admin/api/phieu-thu/tienNuoc")
      .then((res) => {
        let newData = res.data.map((item) => {
          let _canHo =
            item.CanHo[0].maToaNha +
            "-" +
            item.CanHo[0].soTang +
            "-" +
            item.CanHo[0].soCanHo;
          item.ngayLapPhieu = moment(
            new Date(item.ngayLapPhieu).getTime()
          ).format("HH:mm ● DD-MM-YYYY");
          return { ...item, _canHo };
        });
        dispatch(createAction(types.SAVE_LIST_PHIEU_NUOC, newData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const themPhieuNuoc = (data) => {
  const { id_canHo, chiSoMoi, chiSoCu } = data;
  const dt = {
    id_canHo,
    chiSoMoi,
    chiSoCu,
  };
  return (dispatch) => {
    axios
      .post("http://localhost:5000/admin/api/phieu-thu/tienNuoc", {
        data: dt,
      })
      .then((res) => {
        let _canHo =
          res.data[0].CanHo[0].maToaNha +
          "-" +
          res.data[0].CanHo[0].soTang +
          "-" +
          res.data[0].CanHo[0].soCanHo;
        let data = Object.assign({}, res.data[0], {
          _canHo,
          ngayLapPhieu: moment(
            new Date(res.data[0].ngayLapPhieu).getTime()
          ).format("HH:mm ● DD-MM-YYYY"),
        });
        dispatch(createAction(types.ADD_PHIEU_NUOC, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const suaPhieuNuoc = (data) => {
  const { _id, id_canHo, chiSoCu, chiSoMoi } = data;
  const dt = {
    id_canHo,
    chiSoMoi,
    chiSoCu,
  };
  return (dispatch) => {
    axios
      .put("http://localhost:5000/admin/api/phieu-thu/tienNuoc?id=" + _id, {
        data: dt,
      })
      .then((res) => {
        let _canHo =
          res.data[0].CanHo[0].maToaNha +
          "-" +
          res.data[0].CanHo[0].soTang +
          "-" +
          res.data[0].CanHo[0].soCanHo;
        let data = Object.assign({}, res.data[0], {
          _canHo,
          ngayLapPhieu: moment(
            new Date(res.data[0].ngayLapPhieu).getTime()
          ).format("HH:mm ● DD-MM-YYYY"),
        });
        console.log(data);
        dispatch(createAction(types.EDIT_PHIEU_NUOC, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const xoaPhieuNuoc = (data) => {
  let id = data;
  return (dispatch) => {
    axios
      .delete("http://localhost:5000/admin/api/phieu-thu/tienNuoc?id=" + id)
      .then((res) => {
        dispatch(createAction(types.DELETE_PHIEU_NUOC, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkThanhToanPN = (data) => {
  const { _id, tinhTrang } = data;
  const dt = {
    tinhTrang: !tinhTrang,
  };
  return (dispatch) => {
    axios
      .put(
        "http://localhost:5000/admin/api/phieu-thu/checkThanhToan?id=" + _id,
        {
          data: dt,
        }
      )
      .then((res) => {
        let _canHo =
          res.data[0].CanHo[0].maToaNha +
          "-" +
          res.data[0].CanHo[0].soTang +
          "-" +
          res.data[0].CanHo[0].soCanHo;
        let data = Object.assign({}, res.data[0], {
          _canHo,
          ngayLapPhieu: moment(
            new Date(res.data[0].ngayLapPhieu).getTime()
          ).format("HH:mm ● DD-MM-YYYY"),
        });
        dispatch(createAction(types.CHECK_PHIEU_NUOC, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
