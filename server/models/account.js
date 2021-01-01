const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const accountSchema = new Schema({
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  id_cuDan: {
    type: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
    default: null,
    lowercase: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
  },
  email_verify: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  lang: {
    type: String,
    default: "vi-VN",
    enum: ["vi-VN", "en-EN"],
  },
  mode: {
    type: String,
    default: "light",
    enum: ["light", "dark"],
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("account", accountSchema);
