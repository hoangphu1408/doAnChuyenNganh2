const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const messageSchema = new Schema({
    Content: [{
        id_Account: Schema.Types.ObjectId,
        message: String,
        image: String,
    }]
})

module.exports = mongoose.model("message", messageSchema);