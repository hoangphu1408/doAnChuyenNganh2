const Account = require("../models/account");
const Resident = require("../models/resident");

const getResident = async (res) =>{
    const resident = await Resident.find();
    return res.json(resident);
}

const getTaiKhoanCuDan = async (res) =>{
   const account = await Account.aggregate([{
       $match: {
           role: "user",
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

const getAccountAdmin = async (res) =>{
    const account = await Account.find({role:"admin"});
       
    return res.json(account);
}

module.exports = {
    getTaiKhoanCuDan,
    getResident,
    getAccountAdmin
}