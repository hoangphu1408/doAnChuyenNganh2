const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const canHoSchema = new Schema({
    soCanHo: {
        type: String,
    },
    soTang: {
        type: String,
    },
    maToaNha: {
        type: String,
    },
    chuSoHuu: {
        type: mongoose.Types.ObjectId
    },
    chieuDai: {
        type: Number,
    },
    chieuRong: {
        type: Number,
    },
    dienTich: {
        type: Number
    },
    tinhTrang: {
        type: Boolean,
    }
})

module.exports = mongoose.model("canHo", canHoSchema);