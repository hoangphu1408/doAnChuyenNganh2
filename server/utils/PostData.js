const Account = require("../models/account");
const CuDan = require("../models/resident");
const CanHo = require("../models/canHo");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { KEY, MAIL, EMAIL, PASSWORD } = require("../config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const themCuDan = async (data, res) => {
    try{
      const { ten, hoVaTenDem, namSinh, gioiTinh, canCuocCongDan, hoKhau } = data;

      // kiểm tra cư dân có tồn tại 
      const isResident = await timCuDan(canCuocCongDan);
      if(isResident){
          res.json({"error_addData": "Cư dân đã tồn tại"});
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
    }catch(err){
      return res.status(400).json(err)
    }
}

const timCuDan = async (id) => {
    return (await CuDan.findOne({identificationCard: id})) ? true : false;
}

const themTaiKhoanCuDan = async (data, res) => {
    const {email, password, _idCuDan} = data;
    let id = mongoose.Types.ObjectId(_idCuDan);
    const isAccount = await timTaiKhoan(id);
    if(isAccount){
        return res.status(401).json({"error_addData": "Cư dân đã có tài khoản"})
    }

    const updateCudan = await CuDan.findOneAndUpdate({_id: id},{daCoTaiKhoan: true}, {new: true} );
    const payload = {email:email};
    const mailToken = jwt.sign(payload, MAIL, {
        expiresIn: "1 days"
    });
    await verifyEmail(email, mailToken, password);
    const hashPassword = await bcrypt.hash(password,12);
    const newAccount = new Account({
        role: "user",
        id_cuDan: id,
        email: email,
        password: hashPassword,
        date: (new Date()).toISOString(),
        status:true,
    })
    await newAccount.save();
    const account = await Account.aggregate([{
      $match: {
          email: email,
      }
      },{
          $lookup: {
              from: "cudans",
              localField: "id_cuDan",
                foreignField: "_id",
                as: "Owner",
          }
      },{
          $project:{
              role:1,
              id_cuDan: 1,
              email: 1,
              email_verify: 1,
              date: 1,
              status: 1,
              Owner:{
                  ten: 1,
                  hoVaTenDem: 1,
              }
          }
      }])
    return res.json(account);
}

const timTaiKhoan = async (id) => {
    return (await Account.findOne({id_cuDan: id})) ? true : false;
}

const verifyEmail = (email, mailToken ,password) => {
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
  try{
    const {soCanHo, soTang, maToaNha, chuSoHuu, chieuDai, chieuRong} = data;
    const isCanHo = await CanHo.findOne({soCanHo: soCanHo, soTang: soTang, maToaNha: maToaNha});
    if(isCanHo){
      return res.status(400).json({error_canHo: "Căn hộ đã tồn tại"});
    }
    const dienTich = chieuDai * chieuRong;
    let newCanHo;
    if(chuSoHuu !== null)
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
    return res.status(200).json(newCanHo);
  }catch(err){
    return res.status(400).json(err);
  }
}




module.exports = {
    themCuDan,
    themTaiKhoanCuDan,
    themCanHo
}