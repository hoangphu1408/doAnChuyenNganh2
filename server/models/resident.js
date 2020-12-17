const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const cuDanSchema = new Schema({
    ten: {
        type: String,
    },
    hoVaTenDem:{
        type:String,
    },
    namSinh:{
        type: Date,
    },
    gioiTinh: {
        type: String,
        default:"Nam",
        enum: ["Nam", "Nữ"]
    },
    canCuocCongDan:{
        type:String,
    },
    hoKhau:{
        type: String,
        default: "Chưa bổ sung",
        enum: ["Chưa bổ sung","Đã nộp"]
    },
    daCoTaiKhoan:{
        type:Boolean,
        default: false,
    }
})

module.exports = mongoose.model("cuDan", cuDanSchema);