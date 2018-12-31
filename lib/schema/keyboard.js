var mongoose = require('mongoose')
var schema = mongoose.Schema(
    {
        keyboardName: { type: String },
        keyboardType: { type: String, enum: ['free', 'paid'], default: "free" },
        category: { type: String, enum: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'] },
        status: { type: String, enum: ['active', 'invite'], default: 'active' },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String },
        cost: {
            type: Number, required: function () {
                return (this.KeyboardType == "paid") ? true : false
            }
        },


    });
module.exports = mongoose.model('keyboard', schema);