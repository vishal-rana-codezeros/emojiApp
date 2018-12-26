var mongoose = require('mongoose')
var schema = mongoose.Schema({

    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "emoji" },
    receiverId: [{ type: mongoose.Schema.Types.ObjectId, ref: "emoji" }],
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "roomDetails" },
    content: { type: String },
    createdAt: { type: Date, default: Date.now }


})

module.exports = mongoose.model('message', schema)