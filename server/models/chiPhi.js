const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const chiPhiSchema = new Schema({
  maChiPhi: {
    type: String,
  },
  tenLoaiChiPhi: {
    type: String,
  },
  giaTien: {
    type: Number,
  },
});

module.exports = mongoose.model("chiPhi", chiPhiSchema);
