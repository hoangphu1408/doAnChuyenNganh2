const CuDan = require("../models/resident");
const mongoose = require("mongoose");

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

const timIDCuDan = async(id) =>{
    return (await CuDan.findOne({_id: id})) ? true :false;
}

module.exports ={
    suaCuDan
}