import axios from "axios";
import * as types from "../constants/actionType";
import createAction from "./index";

/*=====================================================================================
                                GET TIEN XE
=====================================================================================*/

export const getThongKeTienXeTheoTuan = (week, year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienXeTheoTuan?week=${week}&year=${year}`
      )
      .then((res) => {
        let tienT2 = 0,
          tienT3 = 0,
          tienT4 = 0,
          tienT5 = 0,
          tienT6 = 0,
          tienT7 = 0,
          tienCN = 0;
        for (let i in res.data) {
          if (i === "t2") {
            for (let key of res.data[i]) {
              tienT2 += key.tongTien;
            }
          }
          if (i === "t3") {
            for (let key of res.data[i]) {
              tienT3 += key.tongTien;
            }
          }
          if (i === "t4") {
            for (let key of res.data[i]) {
              tienT4 += key.tongTien;
            }
          }
          if (i === "t5") {
            for (let key of res.data[i]) {
              tienT5 += key.tongTien;
            }
          }
          if (i === "t6") {
            for (let key of res.data[i]) {
              tienT6 += key.tongTien;
            }
          }
          if (i === "t7") {
            for (let key of res.data[i]) {
              tienT7 += key.tongTien;
            }
          }
          if (i === "cn") {
            for (let key of res.data[i]) {
              tienCN += key.tongTien;
            }
          }
        }
        let newData = [tienT2, tienT3, tienT4, tienT5, tienT6, tienT7, tienCN];
        dispatch(createAction(types.GET_TX_THEO_TUAN, newData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTienXeTheoThang = (month, year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienXeTheoThang?month=${month}&year=${year}`
      )
      .then((res) => {
        let tienThang = 0;
        for (let key of res.data) {
          tienThang += key.tongTien;
        }
        dispatch(createAction(types.GET_TX_THEO_THANG, [tienThang]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTienXeTheoNam = (year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienXeTheoNam?year=${year}`
      )
      .then((res) => {
        let tienT1 = 0,
          tienT2 = 0,
          tienT3 = 0,
          tienT4 = 0,
          tienT5 = 0,
          tienT6 = 0,
          tienT7 = 0,
          tienT8 = 0,
          tienT9 = 0,
          tienT10 = 0,
          tienT11 = 0,
          tienT12 = 0;
        for (let i in res.data) {
          if (i === "t1") {
            for (let key of res.data[i]) {
              tienT1 += key.tongTien;
            }
          }
          if (i === "t2") {
            for (let key of res.data[i]) {
              tienT2 += key.tongTien;
            }
          }
          if (i === "t3") {
            for (let key of res.data[i]) {
              tienT3 += key.tongTien;
            }
          }
          if (i === "t4") {
            for (let key of res.data[i]) {
              tienT4 += key.tongTien;
            }
          }
          if (i === "t5") {
            for (let key of res.data[i]) {
              tienT5 += key.tongTien;
            }
          }
          if (i === "t6") {
            for (let key of res.data[i]) {
              tienT6 += key.tongTien;
            }
          }
          if (i === "t7") {
            for (let key of res.data[i]) {
              tienT7 += key.tongTien;
            }
          }
          if (i === "t8") {
            for (let key of res.data[i]) {
              tienT8 += key.tongTien;
            }
          }
          if (i === "t9") {
            for (let key of res.data[i]) {
              tienT9 += key.tongTien;
            }
          }
          if (i === "t10") {
            for (let key of res.data[i]) {
              tienT10 += key.tongTien;
            }
          }
          if (i === "t11") {
            for (let key of res.data[i]) {
              tienT11 += key.tongTien;
            }
          }
          if (i === "t12") {
            for (let key of res.data[i]) {
              tienT12 += key.tongTien;
            }
          }
        }
        let newData = [
          tienT1,
          tienT2,
          tienT3,
          tienT4,
          tienT5,
          tienT6,
          tienT7,
          tienT8,
          tienT9,
          tienT10,
          tienT11,
          tienT12,
        ];
        dispatch(createAction(types.GET_TX_THEO_NAM, newData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

/*=====================================================================================
                                GET TIEN NUOC
=====================================================================================*/

export const getThongKeTienNuocTheoTuan = (week, year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienNuocTheoTuan?week=${week}&year=${year}`
      )
      .then((res) => {
        let tienT2 = 0,
          tienT3 = 0,
          tienT4 = 0,
          tienT5 = 0,
          tienT6 = 0,
          tienT7 = 0,
          tienCN = 0;
        for (let i in res.data) {
          if (i === "t2") {
            for (let key of res.data[i]) {
              tienT2 += key.tongTien;
            }
          }
          if (i === "t3") {
            for (let key of res.data[i]) {
              tienT3 += key.tongTien;
            }
          }
          if (i === "t4") {
            for (let key of res.data[i]) {
              tienT4 += key.tongTien;
            }
          }
          if (i === "t5") {
            for (let key of res.data[i]) {
              tienT5 += key.tongTien;
            }
          }
          if (i === "t6") {
            for (let key of res.data[i]) {
              tienT6 += key.tongTien;
            }
          }
          if (i === "t7") {
            for (let key of res.data[i]) {
              tienT7 += key.tongTien;
            }
          }
          if (i === "cn") {
            for (let key of res.data[i]) {
              tienCN += key.tongTien;
            }
          }
        }
        let newData = [tienT2, tienT3, tienT4, tienT5, tienT6, tienT7, tienCN];
        dispatch(createAction(types.GET_NUOC_THEO_TUAN, newData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTienNuocTheoThang = (month, year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienNuocTheoThang?month=${month}&year=${year}`
      )
      .then((res) => {
        let tienThang = 0;
        for (let key of res.data) {
          tienThang += key.tongTien;
        }
        dispatch(createAction(types.GET_NUOC_THEO_THANG, [tienThang]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTienNuocTheoNam = (year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienNuocTheoNam?year=${year}`
      )
      .then((res) => {
        let tienT1 = 0,
          tienT2 = 0,
          tienT3 = 0,
          tienT4 = 0,
          tienT5 = 0,
          tienT6 = 0,
          tienT7 = 0,
          tienT8 = 0,
          tienT9 = 0,
          tienT10 = 0,
          tienT11 = 0,
          tienT12 = 0;
        for (let i in res.data) {
          if (i === "t1") {
            for (let key of res.data[i]) {
              tienT1 += key.tongTien;
            }
          }
          if (i === "t2") {
            for (let key of res.data[i]) {
              tienT2 += key.tongTien;
            }
          }
          if (i === "t3") {
            for (let key of res.data[i]) {
              tienT3 += key.tongTien;
            }
          }
          if (i === "t4") {
            for (let key of res.data[i]) {
              tienT4 += key.tongTien;
            }
          }
          if (i === "t5") {
            for (let key of res.data[i]) {
              tienT5 += key.tongTien;
            }
          }
          if (i === "t6") {
            for (let key of res.data[i]) {
              tienT6 += key.tongTien;
            }
          }
          if (i === "t7") {
            for (let key of res.data[i]) {
              tienT7 += key.tongTien;
            }
          }
          if (i === "t8") {
            for (let key of res.data[i]) {
              tienT8 += key.tongTien;
            }
          }
          if (i === "t9") {
            for (let key of res.data[i]) {
              tienT9 += key.tongTien;
            }
          }
          if (i === "t10") {
            for (let key of res.data[i]) {
              tienT10 += key.tongTien;
            }
          }
          if (i === "t11") {
            for (let key of res.data[i]) {
              tienT11 += key.tongTien;
            }
          }
          if (i === "t12") {
            for (let key of res.data[i]) {
              tienT12 += key.tongTien;
            }
          }
        }
        let newData = [
          tienT1,
          tienT2,
          tienT3,
          tienT4,
          tienT5,
          tienT6,
          tienT7,
          tienT8,
          tienT9,
          tienT10,
          tienT11,
          tienT12,
        ];
        dispatch(createAction(types.GET_NUOC_THEO_NAM, newData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

/*=====================================================================================
                                GET TIEN XE
=====================================================================================*/

export const getThongKeTienQuanLyTheoTuan = (week, year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienQuanLyTheoTuan?week=${week}&year=${year}`
      )
      .then((res) => {
        let tienT2 = 0,
          tienT3 = 0,
          tienT4 = 0,
          tienT5 = 0,
          tienT6 = 0,
          tienT7 = 0,
          tienCN = 0;
        for (let i in res.data) {
          if (i === "t2") {
            for (let key of res.data[i]) {
              tienT2 += key.tongTien;
            }
          }
          if (i === "t3") {
            for (let key of res.data[i]) {
              tienT3 += key.tongTien;
            }
          }
          if (i === "t4") {
            for (let key of res.data[i]) {
              tienT4 += key.tongTien;
            }
          }
          if (i === "t5") {
            for (let key of res.data[i]) {
              tienT5 += key.tongTien;
            }
          }
          if (i === "t6") {
            for (let key of res.data[i]) {
              tienT6 += key.tongTien;
            }
          }
          if (i === "t7") {
            for (let key of res.data[i]) {
              tienT7 += key.tongTien;
            }
          }
          if (i === "cn") {
            for (let key of res.data[i]) {
              tienCN += key.tongTien;
            }
          }
        }
        let newData = [tienT2, tienT3, tienT4, tienT5, tienT6, tienT7, tienCN];
        dispatch(createAction(types.GET_QL_THEO_TUAN, newData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTienQuanLyTheoThang = (month, year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienQuanLyTheoThang?month=${month}&year=${year}`
      )
      .then((res) => {
        let tienThang = 0;
        for (let key of res.data) {
          tienThang += key.tongTien;
        }
        dispatch(createAction(types.GET_QL_THEO_THANG, [tienThang]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTienQuanLyTheoNam = (year) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:5000/admin/api/thong-ke/tienQuanLyTheoNam?year=${year}`
      )
      .then((res) => {
        let tienT1 = 0,
          tienT2 = 0,
          tienT3 = 0,
          tienT4 = 0,
          tienT5 = 0,
          tienT6 = 0,
          tienT7 = 0,
          tienT8 = 0,
          tienT9 = 0,
          tienT10 = 0,
          tienT11 = 0,
          tienT12 = 0;
        for (let i in res.data) {
          if (i === "t1") {
            for (let key of res.data[i]) {
              tienT1 += key.tongTien;
            }
          }
          if (i === "t2") {
            for (let key of res.data[i]) {
              tienT2 += key.tongTien;
            }
          }
          if (i === "t3") {
            for (let key of res.data[i]) {
              tienT3 += key.tongTien;
            }
          }
          if (i === "t4") {
            for (let key of res.data[i]) {
              tienT4 += key.tongTien;
            }
          }
          if (i === "t5") {
            for (let key of res.data[i]) {
              tienT5 += key.tongTien;
            }
          }
          if (i === "t6") {
            for (let key of res.data[i]) {
              tienT6 += key.tongTien;
            }
          }
          if (i === "t7") {
            for (let key of res.data[i]) {
              tienT7 += key.tongTien;
            }
          }
          if (i === "t8") {
            for (let key of res.data[i]) {
              tienT8 += key.tongTien;
            }
          }
          if (i === "t9") {
            for (let key of res.data[i]) {
              tienT9 += key.tongTien;
            }
          }
          if (i === "t10") {
            for (let key of res.data[i]) {
              tienT10 += key.tongTien;
            }
          }
          if (i === "t11") {
            for (let key of res.data[i]) {
              tienT11 += key.tongTien;
            }
          }
          if (i === "t12") {
            for (let key of res.data[i]) {
              tienT12 += key.tongTien;
            }
          }
        }
        let newData = [
          tienT1,
          tienT2,
          tienT3,
          tienT4,
          tienT5,
          tienT6,
          tienT7,
          tienT8,
          tienT9,
          tienT10,
          tienT11,
          tienT12,
        ];
        dispatch(createAction(types.GET_QL_THEO_NAM, newData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
