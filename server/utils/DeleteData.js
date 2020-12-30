const CuDan = require("../models/resident");
const Account = require("../models/account");
const CanHo = require("../models/canHo");
const ChiPhi = require("../models/chiPhi");
const PhieuThu = require("../models/phieuThuTien");
const xoaCuDan = async (id, res) => {
  try {
    const xoa = await CuDan.findByIdAndDelete({ _id: id }, (err, data) => {
      if (err) return res.json({ error_xoaCuDan: "Khong the xoa" });
      else return res.status(200).json({ _id: id });
    });
  } catch (err) {
    return res.status(400).json("error");
  }
};

const xoaTaiKhoanCuDan = async (id, res) => {
  try {
    const taiKhoan = await Account.findOne({ _id: id });
    const xoa = await Account.findByIdAndDelete(
      { _id: id },
      async (err, data) => {
        if (err) return res.json({ error_xoaTaiKhoan: "Khong the xoa" });
        else {
          await CuDan.findOneAndUpdate(
            { _id: taiKhoan.id_cuDan },
            { daCoTaiKhoan: false },
            { new: true }
          );
          return res.status(200).json({ _id: id });
        }
      }
    );
  } catch (err) {
    return res.status(400).json(error);
  }
};

const xoaTaiKhoanQuanTri = async (id, res) => {
  try {
    const taiKhoan = await Account.findOne({ _id: id });
    const xoa = await Account.findByIdAndDelete(
      { _id: id },
      async (err, data) => {
        if (err) return res.json({ error_xoaTaiKhoan: "Khong the xoa" });
        else {
          return res.status(200).json({ _id: id });
        }
      }
    );
  } catch (err) {
    return res.status(400).json(err);
  }
};

const xoaCanHo = async (id, res) => {
  try {
    const xoa = await CanHo.findByIdAndDelete(
      { _id: id },
      async (err, data) => {
        if (err) return res.json({ error_xoaCanHo: "Khong the xoa" });
        else return res.status(200).json({ _id: id });
      }
    );
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*
============================================================================================
                                    Phí dịch vụ
============================================================================================
*/

const xoaChiPhi = async (id, res) => {
  try {
    const xoa = await ChiPhi.findByIdAndDelete({ _id: id }, (err, data) => {
      if (err) return res.json({ error_xoaChiPhi: "Khong the xoa" });
      else return res.status(200).json({ _id: id });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*
============================================================================================
                                    Phiếu thu nước
============================================================================================
*/

const xoaPhieuNuoc = async (id, res) => {
  try {
    const xoa = await PhieuThu.findByIdAndDelete({ _id: id }, (err, data) => {
      if (err) return res.json({ error_xoaPhieuNuoc: "Khong the xoa" });
      else return res.status(200).json({ _id: id });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*
============================================================================================
                                    Phieu thu giu xe
============================================================================================
*/

const xoaPhieuGiuXe = async (id, res) => {
  try {
    const xoa = await PhieuThu.findByIdAndDelete({ _id: id }, (err, data) => {
      if (err) return res.json({ error_xoaGiuXe: "Khong the xoa" });
      else return res.status(200).json({ _id: id });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*
============================================================================================
                                    Phiếu thu quản lý
============================================================================================
*/

const xoaPhieuQL = async (id, res) => {
  try {
    const xoa = await PhieuThu.findOneAndDelete({ _id: id }, (err, data) => {
      if (err) return res.json({ error_xoaQL: "Khong the xoa" });
      else return res.status(200).json({ _id: id });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  xoaCuDan,
  xoaTaiKhoanCuDan,
  xoaTaiKhoanQuanTri,
  xoaCanHo,
  xoaChiPhi,
  xoaPhieuNuoc,
  xoaPhieuGiuXe,
  xoaPhieuQL,
};
