var mongoose = require('mongoose')
var schema = mongoose.Schema({

    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema" },
    receiverId: [{ type: mongoose.Schema.Types.ObjectId, ref: "userSchema" }],
    // roomId: { type: mongoose.Schema.Types.ObjectId, ref: "roomDetails" },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "roomSchema" },
    content: { type: String },
    createdAt: { type: Date, default: Date.now }


})

module.exports = mongoose.model('messageSchema', schema)

