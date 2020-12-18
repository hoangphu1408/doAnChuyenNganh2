const Account = require("../models/account");
const Resident = require("../models/resident");

const getResident = async (res) =>{
    const resident = await Resident.find();
    return res.json(resident);
}

const getAccount = async (res) =>{
    const account = await Account.find({role: "user"});
    return res.json(account);
}

const getAccountAdmin = async (res) =>{
    const account = await Account.find({role: "admin"});
    return res.json(account);
}

module.exports = {
    getAccount,
    getResident,
    getAccountAdmin
}