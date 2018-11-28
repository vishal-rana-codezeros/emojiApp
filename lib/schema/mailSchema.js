var mongoose = require('mongoose')
var schema = mongoose.Schema({

    name: { type: String, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId},

    createdAt: { type: Date, default: Date.now },

    isActive: { type: Boolean, default: 1 },

    isExpire: { type: Boolean, default: 0 },

    content: { type: String, required: true },

    subject: { type: String, required: true },

    text: { type: String, required: true },

    editedBy: { type: mongoose.Schema.Types.ObjectId}

})
module.exports = mongoose.model('mailSchema', schema);
