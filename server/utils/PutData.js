const CuDan = require("../models/resident");
const mongoose = require("mongoose");
const Account = require("../models/account");
const { KEY, MAIL, EMAIL, PASSWORD } = require("../config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { db } = require("../models/account");
const CanHo = require("../models/canHo");
const BaiDang = require("../models/baiDang");
const ChiPhi = require("../models/chiPhi");
const PhieuThu = require("../models/phieuThuTien");
const suaCuDan = async (id, data, res) => {
  const { ten, hoVaTenDem, namSinh, gioiTinh, canCuocCongDan, hoKhau } = data;
  let _id = mongoose.Types.ObjectId(id);

  // tìm cư dân theo id
  const isResident = await timIDCuDan(_id);
  if (!isResident) {
    return res.json({ error_editData: "Resident is not exist" });
  }

  // tạo biến update
  const dt = {
    ten: ten,
    hoVaTenDem: hoVaTenDem,
    namSinh: namSinh,
    gioiTinh: gioiTinh,
    canCuocCongDan: canCuocCongDan,
    hoKhau: hoKhau,
  };
  const updateCuDan = await CuDan.findOneAndUpdate(
    {
      _id: _id,
    },
    dt,
    {
      new: true,
    }
  );
  return res.status(200).json(Object.assign({}, dt, { _id: id }));
};

const suaTaiKhoan = async (id, data, res) => {
  try {
    const { email_verify, status } = data;
    let _id = mongoose.Types.ObjectId(id);
    const isAccount = await timIDTaiKhoan(_id);
    if (!isAccount) {
      return res.status(400).json({ error_editData: "Account is not exist" });
    }
    const dt = {
      email_verify: email_verify,
      status: status,
    };
    const updateAccount = await Account.findByIdAndUpdate({ _id: _id }, dt, {
      new: true,
    });
    const account = await Account.findOne({ _id: _id });
    return res.status(200).json(Object.assign({}, account, { _id: id }));
  } catch (err) {
    return res.status(400).json(err);
  }
};

const thayDoiEmailTaiKhoan = async (id, data, res) => {
  try {
    let _id = mongoose.Types.ObjectId(id);
    let { email } = data;
    const isAccount = await timIDTaiKhoan(_id);
    if (!isAccount) {
      return res
        .status(400)
        .json({ error_changeEmail: "Account is not exist" });
    }
    const isEmail = await Account.findOne({ email: email });
    if (isEmail) {
      return res
        .status(400)
        .json({ error_changeEmail: "Email is already exist" });
    }
    const payload = { email: email };
    const mailToken = jwt.sign(payload, MAIL, {
      expiresIn: "1 days",
    });
    await verifyEmail(email, mailToken);
    const updateEmail = await Account.findByIdAndUpdate({ _id: _id }, payload, {
      new: true,
    });
    const account = await Account.findOne({ _id: _id });
    return res.status(200).json(Object.assign({}, account, { _id: id }));
  } catch (err) {
    return res.status(400).json(err);
  }
};

const thayDoiMatKhauTaiKhoan = async (id, data, res) => {
  try {
    let _id = mongoose.Types.ObjectId(id);
    let { password } = data;
    const isAccount = await timIDTaiKhoan(_id);
    if (!isAccount) {
      return res.status(400).json({ error_editData: "Account is not exist" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const dt = {
      password: hashPassword,
    };
    const updateMatKhau = await Account.findByIdAndUpdate(
      {
        _id: _id,
      },
      dt,
      {
        new: true,
      }
    );
    return res.status(200);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const timIDTaiKhoan = async (id) => {
  return (await Account.findOne({ _id: id })) ? true : false;
};

const timIDCuDan = async (id) => {
  return (await CuDan.findOne({ _id: id })) ? true : false;
};

const verifyEmail = (email, mailToken) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });
  const url = `http://localhost:3000/verify-mail/${mailToken}`;
  const mailOptions = {
    from: "SocialNetWork<thuthiemgardenHu@gmail.com>",
    to: email,
    subject: "Please verify your email!",
    html: `
           <p>Please click the link below for verify your email address</p>
           <a href="${url}">Click here to active your account ! </a>
        `,
  };
  transport.sendMail(mailOptions, (error, res) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("Success");
      transport.close();
    }
  });
};

const chinhSuaCanHo = async (id, data, res) => {
  try {
    const {
      soCanHo,
      soTang,
      maToaNha,
      _idChuSoHuu,
      chieuDai,
      chieuRong,
    } = data;

    const _id = mongoose.Types.ObjectId(id);
    let dt;
    let dienTich = chieuDai * chieuRong;
    if (_idChuSoHuu !== "") {
      dt = {
        soCanHo: soCanHo,
        soTang: soTang,
        maToaNha: maToaNha,
        chieuDai: chieuDai,
        chieuRong: chieuRong,
        dienTich: dienTich,
        chuSoHuu: mongoose.Types.ObjectId(_idChuSoHuu),
        tinhTrang: true,
      };
    } else {
      dt = {
        soCanHo: soCanHo,
        soTang: soTang,
        maToaNha: maToaNha,
        chieuDai: chieuDai,
        chieuRong: chieuRong,
        dienTich: dienTich,
        tinhTrang: false,
      };
    }

    const updateCanHo = await CanHo.findOneAndUpdate({ _id: _id }, dt, {
      new: true,
    });
    const canHo = await CanHo.aggregate([
      {
        $match: {
          _id: _id,
        },
      },
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
    return res.status(200).json(canHo);
  } catch (err) {
    return res.status(400).json(err);
  }
};
const chinhSuaThongBao = async (id, data, res) => {
  try {
    const _id = mongoose.Types.ObjectId(id);
    const { content } = data;
    const dt = {
      content: content,
    };
    const updateThongBao = await BaiDang.findByIdAndUpdate(
      {
        _id: _id,
      },
      dt,
      { new: true }
    );
    const baiDang = await BaiDang.aggregate([
      {
        $match: {
          _id: newThongBao._id,
        },
      },
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
    return re.status(200).json(baiDang);
  } catch (err) {
    return res.status(400);
  }
};

/*
============================================================================================
                                    Phí dịch vụ
============================================================================================
*/

const chinhSuaChiPhi = async (id, data, res) => {
  try {
    const { maChiPhi, tenLoaiChiPhi, giaTien } = data;
    const _id = mongoose.Types.ObjectId(id);
    const dt = {
      maChiPhi: maChiPhi,
      tenLoaiChiPhi: tenLoaiChiPhi,
      giaTien: giaTien,
    };
    const updateChiPhi = await ChiPhi.findOneAndUpdate({ _id: _id }, dt, {
      new: true,
    });
    const chiPhi = await ChiPhi.findOne({ _id: _id });
    return res.status(200).json(chiPhi);
  } catch (err) {
    return res.status(400);
  }
};

/*
============================================================================================
                                    Phieu thu tien nuoc
============================================================================================
*/
const chinhSuaPhieuNuoc = async (id, data, res) => {
  try {
    const { id_canHo, chiSoMoi, chiSoCu } = data;
    const _id = mongoose.Types.ObjectId(id);
    let _id_canHo = mongoose.Types.ObjectId(id_canHo);
    let tienDM1 = 0,
      tienDM2 = 0,
      tienDM3 = 0,
      dm1 = 0,
      dm2 = 0,
      dm3 = 0;
    const dinhMuc1 = await ChiPhi.find({
      maChiPhi: "NDM1",
    });
    const dinhMuc2 = await ChiPhi.find({
      maChiPhi: "NDM2",
    });
    const dinhMuc3 = await ChiPhi.find({
      maChiPhi: "NDM2",
    });
    const tieuThu = chiSoMoi - chiSoCu;
    if (tieuThu <= 4) {
      dm1 = tieuThu;
      tienDM1 = dm1 * dinhMuc1[0].giaTien;
    } else if (tieuThu <= 10) {
      dm1 = 4;
      dm2 = tieuThu - dm1;
      tienDM1 = dm1 * dinhMuc1[0].giaTien;
      tienDM2 = dm2 * dinhMuc2[0].giaTien;
    } else {
      dm1 = 4;
      dm2 = 6;
      dm3 = tieuThu - dm1 - dm2;
      tienDM1 = dm1 * dinhMuc1[0].giaTien;
      tienDM2 = dm2 * dinhMuc2[0].giaTien;
      tienDM3 = dm3 * dinhMuc3[0].giaTien;
    }

    const tongTien = tienDM1 + tienDM2 + tienDM3;
    const noiDung = {
      chiSoMoi: Number(chiSoMoi),
      chiSoCu: Number(chiSoCu),
      tieuThu: tieuThu,
      dinhMuc1: dm1,
      dinhMuc2: dm2,
      dinhMuc3: dm3,
      tienDinhMuc1: tienDM1,
      tienDinhMuc2: tienDM2,
      tienDinhMuc3: tienDM3,
    };
    const dt = {
      id_canHo: _id_canHo,
      noiDung: noiDung,
      tongTien: tongTien,
    };
    const updatePhieuNuoc = await PhieuThu.findOneAndUpdate({ _id: _id }, dt, {
      new: true,
    });
    const phieuNuoc = await PhieuThu.aggregate([
      {
        $match: {
          _id: _id,
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
    return res.status(400);
  }
};

/*
============================================================================================
                                    Phieu thu tien nuoc
============================================================================================
*/

const chinhSuaPhieuGiuXe = async (id, data, res) => {
  try {
    const { id_canHo, xeOto, xeMay, xeDap } = data;
    let _id_canHo = mongoose.Types.ObjectId(id_canHo);
    const _id = mongoose.Types.ObjectId(id);
    let tienOto = 0,
      tienXeMay = 0,
      tienXeDap = 0,
      tongTien = 0;
    const OT = await ChiPhi.find({
      maChiPhi: "GXO",
    });
    const XM = await ChiPhi.find({
      maChiPhi: "GXM",
    });
    const XD = await ChiPhi.find({
      maChiPhi: "GXD",
    });
    tienOto = xeOto * OT[0].giaTien;
    tienXeMay = xeMay * XM[0].giaTien;
    tienXeDap = xeDap * XD[0].giaTien;
    tongTien = tienOto + tienXeDap + tienXeMay;
    const noiDung = {
      oto: Number(xeOto),
      xeMay: Number(xeMay),
      xeDap: Number(xeDap),
      tienOto: tienOto,
      tienXeMay: tienXeMay,
      tienXeDap: tienXeDap,
    };
    const dt = {
      id_canHo: _id_canHo,
      noiDung: noiDung,
      tongTien: tongTien,
    };
    const updatePhiGiuXe = await PhieuThu.findOneAndUpdate({ _id: _id }, dt, {
      new: true,
    });
    const phieuGiuXe = await PhieuThu.aggregate([
      {
        $match: {
          _id: _id,
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
                                    Check thanh toán
============================================================================================
*/

const updateThanhToan = async (id, data, res) => {
  try {
    const { tinhTrang } = data;
    const _id = mongoose.Types.ObjectId(id);
    const dt = {
      tinhTrang: tinhTrang,
    };
    const update = await PhieuThu.findOneAndUpdate({ _id: _id }, dt, {
      new: true,
    });
    const phieu = await PhieuThu.aggregate([
      {
        $match: {
          _id: _id,
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
    return res.status(200).json(phieu);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  suaCuDan,
  suaTaiKhoan,
  thayDoiMatKhauTaiKhoan,
  thayDoiEmailTaiKhoan,
  chinhSuaCanHo,
  chinhSuaThongBao,
  chinhSuaChiPhi,
  chinhSuaPhieuNuoc,
  chinhSuaPhieuGiuXe,
  updateThanhToan,
};
