const CuDan = require("../models/resident");
const mongoose = require("mongoose");
const Account = require("../models/account");

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

const timIDTaiKhoan = async(id) =>{
    return (await Account.findOne({_id: id})) ? true :false;
}

const timIDCuDan = async(id) =>{
    return (await CuDan.findOne({_id: id})) ? true :false;
}

module.exports ={
    suaCuDan
}