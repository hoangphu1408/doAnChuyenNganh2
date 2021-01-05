const Account = require("../models/account");
const Resident = require("../models/resident");
const CanHo = require("../models/canHo");
const BaiDang = require("../models/baiDang");
const ChiPhi = require("../models/chiPhi");
const PhieuThu = require("../models/phieuThuTien");
const moment = require("moment");
const mongoose = require("mongoose");
const canHo = require("../models/canHo");

const getResident = async (res) => {
  const resident = await Resident.find();
  return res.json(resident);
};

const getTaiKhoanCuDan = async (res) => {
  const account = await Account.aggregate([
    {
      $match: {
        role: "user",
      },
    },
    {
      $lookup: {
        from: "cudans",
        localField: "id_cuDan",
        foreignField: "_id",
        as: "Owner",
      },
    },
    {
      $project: {
        role: 1,
        id_cuDan: 1,
        email: 1,
        email_verify: 1,
        date: 1,
        status: 1,
        Owner: {
          ten: 1,
          hoVaTenDem: 1,
        },
      },
    },
  ]);
  return res.json(account);
};

const getAccountAdmin = async (res) => {
  const account = await Account.find({ role: "admin" });

  return res.json(account);
};

const getCanHo = async (res) => {
  const canHo = await CanHo.aggregate([
    {
      $lookup: {
        from: "cudans",
        localField: "chuSoHuu",
        foreignField: "_id",
        as: "Owner",
      },
    },
    {
      $project: {
        soCanHo: 1,
        soTang: 1,
        maToaNha: 1,
        chuSoHuu: 1,
        chieuDai: 1,
        chieuRong: 1,
        dienTich: 1,
        tinhTrang: 1,
        Owner: {
          ten: 1,
          hoVaTenDem: 1,
        },
      },
    },
  ]);
  return res.json(canHo);
};

const getBaiDang = async (res) => {
  const baiDang = await BaiDang.aggregate([
    {
      $lookup: {
        from: "accounts",
        localField: "id_taiKhoan",
        foreignField: "_id",
        as: "Owner",
      },
    },
    {
      $project: {
        Owner: {
          email: 1,
        },
        id_taiKhoan: 1,
        noiDung: 1,
        theLoai: 1,
        tinhTrang: 1,
        ngayDang: 1,
      },
    },
  ]);
  return res.json(baiDang);
};

/*
============================================================================================
                                    Phí dịch vụ
============================================================================================
*/

const getChiPhi = async (res) => {
  const chiPhi = await ChiPhi.find();
  return res.json(chiPhi);
};

/*
============================================================================================
                                    Phí thu nước
============================================================================================
*/

const getPhieuNuoc = async (res) => {
  try {
    const phieuNuoc = await PhieuThu.aggregate([
      {
        $match: {
          loai_phieuThu: "water_fee",
        },
      },
      {
        $lookup: {
          from: "canhos",
          localField: "id_canHo",
          foreignField: "_id",
          as: "CanHo",
        },
      },
    ]);
    return res.status(200).json(phieuNuoc);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*
============================================================================================
                                    Phieu thu giu xe
============================================================================================
*/

const getPhieuGiuXe = async (res) => {
  try {
    const phieuGiuXe = await PhieuThu.aggregate([
      {
        $match: {
          loai_phieuThu: "parking_fee",
        },
      },
      {
        $lookup: {
          from: "canhos",
          localField: "id_canHo",
          foreignField: "_id",
          as: "CanHo",
        },
      },
    ]);
    return res.status(200).json(phieuGiuXe);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*
============================================================================================
                                    Phiếu thu quản lý
============================================================================================
*/

const getPhieuQL = async (res) => {
  try {
    const phieuQL = await PhieuThu.aggregate([
      {
        $match: {
          loai_phieuThu: "service_fee",
        },
      },
      {
        $lookup: {
          from: "canhos",
          localField: "id_canHo",
          foreignField: "_id",
          as: "CanHo",
        },
      },
    ]);
    return res.status(200).json(phieuQL);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*
============================================================================================
                                    Thống kê tiền xe theo tuần
============================================================================================
*/

const getTienXeTheoTuan = async (week, res) => {
  try {
    const phieuTienXe = await PhieuThu.find({ loai_phieuThu: "parking_fee" });
    let finalArr = {
      t2: [],
      t3: [],
      t4: [],
      t5: [],
      t6: [],
      t7: [],
      cn: [],
    };
    phieuTienXe.filter((item) => {
      let date = new Date(item.ngayLapPhieu).getTime();
      let isWeek = moment(date).isoWeek();
      let weekDay = moment(date).month();
      if (week == isWeek) {
        switch (weekDay) {
          case 0:
            return finalArr.t2.push(Object.assign({}, item._doc));
          case 1:
            return finalArr.t3.push(Object.assign({}, item._doc));
          case 2:
            return finalArr.t4.push(Object.assign({}, item._doc));
          case 3:
            return finalArr.t5.push(Object.assign({}, item._doc));
          case 4:
            return finalArr.t6.push(Object.assign({}, item._doc));
          case 5:
            return finalArr.t7.push(Object.assign({}, item._doc));
          case 6:
            return finalArr.cn.push(Object.assign({}, item._doc));
        }
        return item;
      }
    });
    return res.status(200).json(finalArr);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getTienXeTheoThang = async (month, res) => {
  try {
    const phieuTienXe = await PhieuThu.find({ loai_phieuThu: "parking_fee" });
    let newArr = phieuTienXe.filter((item) => {
      let date = new Date(item.ngayLapPhieu).getTime();
      let isMonth = moment(date).month();
      if (month == isMonth) {
        return item;
      }
    });
    return res.status(200).json(newArr);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getTienXeTheoNam = async (year, res) => {
  try {
    const phieuTienXe = await PhieuThu.find({ loai_phieuThu: "parking_fee" });
    let finalArr = {
      t1: [],
      t2: [],
      t3: [],
      t4: [],
      t5: [],
      t6: [],
      t7: [],
      t8: [],
      t9: [],
      t10: [],
      t11: [],
      t12: [],
    };
    phieuTienXe.filter((item) => {
      let date = new Date(item.ngayLapPhieu).getTime();
      let isYear = moment(date).year();
      let month = moment(date).month();
      if (year == isYear) {
        switch (month) {
          case 0:
            return finalArr.t1.push(Object.assign({}, item._doc));
          case 1:
            return finalArr.t2.push(Object.assign({}, item._doc));
          case 2:
            return finalArr.t3.push(Object.assign({}, item._doc));
          case 3:
            return finalArr.t4.push(Object.assign({}, item._doc));
          case 4:
            return finalArr.t5.push(Object.assign({}, item._doc));
          case 5:
            return finalArr.t6.push(Object.assign({}, item._doc));
          case 6:
            return finalArr.t7.push(Object.assign({}, item._doc));
          case 7:
            return finalArr.t8.push(Object.assign({}, item._doc));
          case 8:
            return finalArr.t9.push(Object.assign({}, item._doc));
          case 9:
            return finalArr.t10.push(Object.assign({}, item._doc));
          case 10:
            return finalArr.t11.push(Object.assign({}, item._doc));
          case 11:
            return finalArr.t12.push(Object.assign({}, item._doc));
        }
        return item;
      }
    });
    return res.status(200).json(finalArr);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*
============================================================================================
                                    Lấy phiếu giữ xe user
============================================================================================
*/

const getBillUser = async (idCuDan, res) => {
  try {
    const chuSoHuu = mongoose.Types.ObjectId(idCuDan);
    const bills = await CanHo.aggregate([
      {
        $match: {
          chuSoHuu: chuSoHuu,
        },
      },
      {
        $lookup: {
          from: "phieuthus",
          localField: "_id",
          foreignField: "id_canHo",
          as: "phieuThu",
        },
      },
      {
        $project: {
          phieuThu: 1,
        },
      },
    ]);

    bills.forEach((bill) => {
      return (bill.phieuThu = bill.phieuThu.filter(
        (x) => x.tinhTrang === false
      ));
    });
    return res.status(200).json(bills);
  } catch (err) {
    return res.status(200).json(err);
  }
};

module.exports = {
  getTaiKhoanCuDan,
  getResident,
  getAccountAdmin,
  getCanHo,
  getBaiDang,
  getChiPhi,
  getPhieuNuoc,
  getPhieuGiuXe,
  getPhieuQL,
  getTienXeTheoTuan,
  getTienXeTheoThang,
  getTienXeTheoNam,
  getBillUser,
};
