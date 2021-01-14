const Account = require("../models/account");
const CuDan = require("../models/resident");
const CanHo = require("../models/canHo");
const BaiDang = require("../models/baiDang");
const ChiPhi = require("../models/chiPhi");
const PhieuThu = require("../models/phieuThuTien");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { KEY, MAIL, EMAIL, PASSWORD } = require("../config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const themCuDan = async (data, res) => {
  try {
    const { ten, hoVaTenDem, namSinh, gioiTinh, canCuocCongDan, hoKhau } = data;

    // kiểm tra cư dân có tồn tại
    const isResident = await timCuDan(canCuocCongDan);
    if (isResident) {
      res.json({ error_addData: "Cư dân đã tồn tại" });
      return res.status(401);
    }

    // khởi tạo cư dân mới
    const newCuDan = new CuDan({
      ten: ten,
      hoVaTenDem: hoVaTenDem,
      namSinh: namSinh,
      gioiTinh: gioiTinh,
      canCuocCongDan: canCuocCongDan,
      hoKhau: hoKhau,
    });
    await newCuDan.save();
    return res.json(newCuDan);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const timCuDan = async (id) => {
  return (await CuDan.findOne({ identificationCard: id })) ? true : false;
};

const themTaiKhoanCuDan = async (data, res) => {
  const { email, password, _idCuDan } = data;
  let id = mongoose.Types.ObjectId(_idCuDan);
  const isAccount = await timTaiKhoan(id);
  if (isAccount) {
    return res.status(401).json({ error_addData: "Cư dân đã có tài khoản" });
  }

  const updateCudan = await CuDan.findOneAndUpdate(
    { _id: id },
    { daCoTaiKhoan: true },
    { new: true }
  );
  const payload = { email: email };
  const mailToken = jwt.sign(payload, MAIL, {
    expiresIn: "1 days",
  });
  await verifyEmail(email, mailToken, password);
  const hashPassword = await bcrypt.hash(password, 12);
  const newAccount = new Account({
    role: "user",
    id_cuDan: id,
    email: email,
    password: hashPassword,
    date: new Date().toISOString(),
    status: true,
  });
  await newAccount.save();
  const account = await Account.aggregate([
    {
      $match: {
        email: email,
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

const timTaiKhoan = async (id) => {
  return (await Account.findOne({ id_cuDan: id })) ? true : false;
};

const verifyEmail = (email, mailToken, password) => {
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
            <p>email: ${email}</p>
            <p>password: ${password}</p>
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

const themCanHo = async (data, res) => {
  try {
    const { soCanHo, soTang, maToaNha, chuSoHuu, chieuDai, chieuRong } = data;
    const isCanHo = await CanHo.findOne({
      soCanHo: soCanHo,
      soTang: soTang,
      maToaNha: maToaNha,
    });
    if (isCanHo) {
      return res.status(400).json({ error_canHo: "Căn hộ đã tồn tại" });
    }
    const dienTich = chieuDai * chieuRong;
    let newCanHo;
    if (chuSoHuu !== "")
      newCanHo = new CanHo({
        soCanHo: soCanHo,
        soTang: soTang,
        maToaNha: maToaNha,
        chieuDai: chieuDai,
        chieuRong: chieuRong,
        dienTich: dienTich,
        chuSoHuu: mongoose.Types.ObjectId(chuSoHuu),
        tinhTrang: true,
      });
    else
      newCanHo = new CanHo({
        soCanHo: soCanHo,
        soTang: soTang,
        maToaNha: maToaNha,
        chieuDai: chieuDai,
        chieuRong: chieuRong,
        dienTich: dienTich,
        tinhTrang: false,
      });
    await newCanHo.save();
    const canHo = await CanHo.aggregate([
      {
        $match: {
          soCanHo: soCanHo,
          soTang: soTang,
          maToaNha: maToaNha,
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

const themThongBao = async (data, res) => {
  try {
    const { email, content, hinhAnh } = data;
    const account = await Account.findOne({ email: email });
    const newThongBao = new BaiDang({
      id_taiKhoan: mongoose.Types.ObjectId(account._id),
      noiDung: content,
      hinhAnh: hinhAnh,
      theLoai: "Thông báo",
      tinhTrang: true,
      ngayDang: new Date().toISOString(),
    });
    await newThongBao.save();
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

    return res.status(200).json(baiDang);
  } catch (err) {
    return res.json(400);
  }
};

/*
============================================================================================
                                    Phí dịch vụ
============================================================================================
*/

const themPhiDichVu = async (data, res) => {
  try {
    const { maChiPhi, tenLoaiChiPhi, giaTien } = data;
    const newChiPhi = new ChiPhi({
      maChiPhi: maChiPhi,
      tenLoaiChiPhi: tenLoaiChiPhi,
      giaTien: giaTien,
    });
    await newChiPhi.save();
    return res.status(200).json(newChiPhi);
  } catch (err) {
    return res.status(400);
  }
};

/*
============================================================================================
                                    Phieu thu tien nuoc
============================================================================================
*/

const themPhieuThuNuoc = async (data, res) => {
  try {
    const { id_canHo, chiSoMoi, chiSoCu } = data;
    if (id_canHo === "") return res.status(400);
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

    const newPhieuNuoc = await PhieuThu({
      id_canHo: _id_canHo,
      loai_phieuThu: "water_fee",
      noiDung: noiDung,
      tongTien: tongTien,
      tinhTrang: false,
      ngayLapPhieu: new Date().toISOString(),
    });

    await newPhieuNuoc.save();
    const phieuNuoc = await PhieuThu.aggregate([
      {
        $match: {
          _id: newPhieuNuoc._id,
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
                                    Phieu thu tien nuoc
============================================================================================
*/

const themPhieuThuGiuXe = async (data, res) => {
  try {
    const { id_canHo, xeOto, xeMay, xeDap } = data;
    let _id_canHo = mongoose.Types.ObjectId(id_canHo);
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
    const newPhieuGiuXe = new PhieuThu({
      id_canHo: _id_canHo,
      loai_phieuThu: "parking_fee",
      noiDung: noiDung,
      tongTien: tongTien,
      tinhTrang: false,
      ngayLapPhieu: new Date().toISOString(),
    });
    await newPhieuGiuXe.save();
    const phieuGiuXe = await PhieuThu.aggregate([
      {
        $match: {
          _id: newPhieuGiuXe._id,
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

const themPhieuQuanLy = async (data, res) => {
  try {
    const { id_canHo } = data;
    const _id_canHo = mongoose.Types.ObjectId(id_canHo);
    const canHo = await CanHo.findOne({ _id: _id_canHo });
    const tienQL = await ChiPhi.find({
      maChiPhi: "QLCH",
    });
    const tongTien = tienQL[0].giaTien * canHo.dienTich;
    const noiDung = {
      chieuRong: canHo.chieuRong,
      chieuDai: canHo.chieuDai,
      dienTich: canHo.dienTich,
    };
    const newPhieuQL = new PhieuThu({
      id_canHo: _id_canHo,
      loai_phieuThu: "service_fee",
      noiDung: noiDung,
      tongTien: tongTien,
      tinhTrang: false,
      ngayLapPhieu: new Date().toISOString(),
    });
    await newPhieuQL.save();
    const phieuQuanLy = await PhieuThu.aggregate([
      {
        $match: {
          _id: newPhieuQL._id,
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
    return res.status(200).json(phieuQuanLy);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  themCuDan,
  themTaiKhoanCuDan,
  themCanHo,
  themThongBao,
  themPhiDichVu,
  themPhieuThuNuoc,
  themPhieuThuGiuXe,
  themPhieuQuanLy,
};
