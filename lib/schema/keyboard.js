var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema(
    {
        keyboardName: { type: String,required:true},
        keyboardType: { type: String, enum: ['free', 'paid'], default: "free",require:true },
        category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
        status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String },
        image: [{ type: String, default: '' }],
        cost: {
            type: Number, default: 0,required: function () {
                return (this.KeyboardType == "paid") ? true : false
            }
        },

    });
schema.plugin(mongoosePaginate)

module.exports = mongoose.model('keyboardSchema', schema);

