const Account = require("../models/account");
const Resident = require("../models/resident");
const getAccount = async (res) => {
    const account = await Account.aggregate([
        {
            $project:{
                email: 1
            }
        }
    ]);
    return res.json(account);
}

const getResident = async (res) =>{
    const resident = await Resident.find();
    return res.json(resident);
}

module.exports = {
    getAccount,
    getResident
}