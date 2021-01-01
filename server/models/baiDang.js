const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const baiDangSchema = new Schema({
  id_taiKhoan: {
    type: mongoose.Types.ObjectId,
  },
  noiDung: {
    type: String,
  },
  hinhAnh: {
    type: String,
  },
  theLoai: {
    type: String,
    default: "Default",
    enum: ["Thông báo", "Default"],
  },
  likes: {},
  comments: {},
  tinhTrang: {
    type: Boolean,
  },
  ngayDang: {
    type: Date,
  },
});

module.exports = mongoose.model("baiDang", baiDangSchema);
