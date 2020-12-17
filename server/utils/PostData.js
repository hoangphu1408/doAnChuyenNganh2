const Account = require("../models/account");
const CuDan = require("../models/resident");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { KEY, MAIL, EMAIL, PASSWORD } = require("../config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const themCuDan = async (data, res) => {
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
}

const timCuDan = async (id) => {
    return (await CuDan.findOne({identificationCard: id})) ? true : false;
}

const themTaiKhoanCuDan = async (data, res) => {
    const {email, password, _id} = data;
    let id = mongoose.Types.ObjectId(_id);
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
        id_cuDan: mongoose.Types.ObjectId(_id),
        email: email,
        password: hashPassword,
        date: Date.now(),
        status:true,
    })
    await newAccount.save();
    return res.json(newAccount);
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

module.exports = {
    themCuDan,
    themTaiKhoanCuDan,
}