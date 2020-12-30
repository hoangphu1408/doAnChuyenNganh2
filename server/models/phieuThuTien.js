const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const phieuThuTienSchema = new Schema({
  id_canHo: {
    type: mongoose.Types.ObjectId,
  },
  loai_phieuThu: {
    type: String,
    default: "service_fee",
    enum: ["service_fee", "water_fee", "parking_fee"],
  },
  noiDung: {
    type: Object,
  },
  tongTien: {
    type: Number,
  },
  tinhTrang: {
    type: Boolean,
  },
  ngayLapPhieu: {
    type: Date,
  },
  ngayThanhToan: {
    type: Date,
  },
});

module.exports = mongoose.model("phieuThu", phieuThuTienSchema);
