const CuDan = require("../models/resident");
const mongoose = require("mongoose");
const Account = require("../models/account");
const { KEY, MAIL, EMAIL, PASSWORD } = require("../config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const suaCuDan  = async (id,data, res) =>{
    const { ten, hoVaTenDem, namSinh, gioiTinh, canCuocCongDan, hoKhau } = data;
    let _id = mongoose.Types.ObjectId(id);

    // tìm cư dân theo id 
    const isResident = await timIDCuDan(_id);
    if(!isResident){
        return res.json({"error_editData": "Resident is not exist"})
    }

    // tạo biến update
    const dt = {
        ten: ten,
        hoVaTenDem: hoVaTenDem,
        namSinh: namSinh,
        gioiTinh: gioiTinh,
        canCuocCongDan: canCuocCongDan,
        hoKhau: hoKhau,
    }
    const updateCuDan = await CuDan.findOneAndUpdate({
        _id: _id
    }, dt,{
        new: true
    })
    return res.status(200).json(Object.assign({},dt,{_id:id}));

}

const suaTaiKhoanCuDan = async(id, data, res) =>{
    try{
        const { email, password } = data;
        let _id = mongoose.Types.ObjectId(id);

        const isAccount = await timIDCuDan(_id);
        if(!isAccount){
            return res.status(400).json({"error_editData": "Account is not exist"})
        }
        const dt = {
            
        }
    }catch(err){
        return res.status(400).json("Error")
    }
}

const suaTaiKhoan = async(id, data, res) =>{
    try{
        const {email, email_verify, status} = data;
        let _id = mongoose.Types.ObjectId(id)
        const isAccount = await timIDTaiKhoan(_id);
        if(!isAccount){
            return res.status(400).json({"error_editData": "Account is not exist"})
        }
        const isEmail = await timEmailTaiKhoan(email);
        if(isEmail){
            // return res.status(400).json({"error_editData": "Email is already exist"})
            return console.log(isEmail);
        }
        const dt = {
            email: email,
            email_verify: email_verify,
            status: status,
        }
        const payload = {email:email};
        const mailToken = jwt.sign(payload, MAIL, {
            expiresIn: "1 days"
        });
       
        await verifyEmail(email, mailToken);
        const updateAccount = await Account.findByIdAndUpdate({_id: _id}, dt, {
            new: true
        });
        return res.status(200).json(Object.assign({},dt,{_id:id}));
    }catch(err){
        return res.status(400).json(err);
    }
}

const timEmailTaiKhoan = async(email) => {
    return (await Account.findOne({email: email}) ? true: false);
}


const timIDTaiKhoan = async(id) =>{
    return (await Account.findOne({_id: id})) ? true :false;
}

const timIDCuDan = async(id) =>{
    return (await CuDan.findOne({_id: id})) ? true :false;
}

const verifyEmail = (email, mailToken ) => {
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



module.exports ={
    suaCuDan,
    suaTaiKhoan
}