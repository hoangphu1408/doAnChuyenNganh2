const Account = require("../models/account");


const bcrypt = require("bcryptjs");
const { KEY, MAIL, EMAIL, PASSWORD } = require("../config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const registrationAccount = async (data,res) =>{
    // const admin = await Account.find({role: "admin"});
    const {email, password, code} = data;

     const isUser = await findEmail(email);
    if(isUser){
       res.json({ "error_register": "Email is already exist"});
       return res.status(401)
    }
    if(code !== "1234"){
        return res.status(401).json({ "error_register": "Code is incorrect"})
    }
    const payload = {email: email};
    const mailToken = jwt.sign(payload, MAIL, {
        expiresIn: "1 days"
    })
    await verifyEmail(email, mailToken);
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAccount = new Account({
        role: "admin",
        email: email,
        password: hashedPassword,
        date: (new Date()).toISOString(),
        status: true,
    })
    await newAccount.save();
    return res.status(200).json({"isRegister": false});
}

const loginAccount = async (data,res) =>{
    const { email, password } = data;
    const isEmail = await findEmail(email);
    if(!isEmail){
        return res.json({ "error_login": "Email or password incorrect!"});
    }
    const mail = await Account.findOne({email: email});
    const isMatch = await bcrypt.compare(password, mail.password);
    if(!isMatch){
        return res.json({"error_login": "Email or password incorrect!"})
    }
    if(mail.email_verify === false){
        const payload = {email: email};
        const mailToken = jwt.sign(payload, MAIL, {
            expiresIn: "1 days"
        })
        await verifyEmail(email, mailToken);
        return res.json({"error_login":"Email isn't verify ! Please check your email to verify"})
    }
    const payload = {
        _id: mail._id,
        role: mail.role,
        email: mail.email,
    }
    const signToken = await jwt.sign(payload, KEY, {
        expiresIn: "1 days"
    })
    const account = {
      email: email,
      role: mail.role,
    }
    return res.json({"isLogin": true,signToken,account} );
}

const taoTaiKhoan = async (data, res) => {
   const {email, password} = data;

     const isUser = await findEmail(email);
    if(isUser){
       res.json({ "error_register": "Email is already exist"});
       return res.status(401);
    }
    const payload = {email: email};
    const mailToken = jwt.sign(payload, MAIL, {
        expiresIn: "1 days"
    })
    await verifyEmail(email, mailToken);
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAccount = new Account({
      role: "admin",
      email: email,
      email_verify: false,
      password: hashedPassword,
      date: (new Date()).toISOString(),
      status: true,
    });
    
    await newAccount.save();
    return res.status(200).json(newAccount);
}


const findEmail = async(email) => {
    return (await Account.findOne({email: email})) ? true : false;
}

const verifyEmailToken = async (token, res) => {
  try {
    const verified = jwt.verify(token, MAIL);
    const isTrue = { email_verify: true };
    await Account.findOneAndUpdate({ email: verified.email }, isTrue, {
      new: true,
    });
    return res.json("Success");
  } catch (err) {
    return res.json("Verify Error");
  }
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


module.exports = {
    registrationAccount,
    loginAccount,
    verifyEmailToken,
    taoTaiKhoan,
}