var mongoose = require('mongoose')
var schema = mongoose.Schema({

    subject: { type: String },
    message: { type: String },
    submittedBy: { type: String },
    submittedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('contactUsSchema', schema);