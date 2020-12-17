const CuDan = require('../models/resident');
const Account = require('../models/account');
const xoaCuDan = async(id, res) =>{
    try{
        const xoa = await CuDan.findByIdAndDelete({_id: id}, (err, data) =>{
        if(err)
            return res.json({"error_xoaCuDan": "Khong the xoa"});
        else
            return res.status(200).json({_id: id});
        })
    }catch(err){
        return res.status(400).json("error");
    }
}

const xoaTaiKhoanCuDan = async(id,res) => {
    try{
        const taiKhoan = await Account.findOne({_id: id})
    const xoa = await Account.findByIdAndDelete({_id: id}, async (err, data) =>{
        if(err)
            return res.json({"error_xoaTaiKhoan": "Khong the xoa"});
        else
            {
                await CuDan.findOneAndUpdate({_id: taiKhoan.id_cuDan}, {daCoTaiKhoan: false}, {new: true});
                return res.status(200).json("success");
            }
        })
    }catch(err){
        return res.status(400).json("error");
    }
}

module.exports = {
    xoaCuDan,
    xoaTaiKhoanCuDan
}