const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const baiDangSchema = new Schema({
    id_taiKhoan: {
        type: mongoose.Types.ObjectId()
    },
    noiDung: {
        type: String,
    },
    hinhAnh:{
        type: String,
    },
    theLoai: {
        type: String,
        default: "Thông báo",
        enum: ["Thông báo", "Bài đăng bình thường"]
    },
    tinhTrang:{
        type: Boolean,
    },
    ngayDang: {
        type: Date,
    }
})

module.exports = mongoose.model("baiDang", baiDangSchema);