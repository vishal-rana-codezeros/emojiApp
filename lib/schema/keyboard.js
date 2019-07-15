var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema(
    {
        keyboardName: { type: String },
        keyboardType: { type: String, enum: ['free', 'paid'], default: "free" },
        categoryName: { type: mongoose.Schema.Types.ObjectId, ref: "categoryschema" },
        status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String },
        displayImage: [{ type: String, default: '' }],
        subImages: [{ type: String }],
        purchaseDate: { type: Date },
        description: String,
        cost: {
            type: Number, default: 0, required: function () {
                return (this.KeyboardType == "paid") ? true : false
            }
        },
    });
schema.plugin(mongoosePaginate)

module.exports = mongoose.model('keyboardSchema', schema);

