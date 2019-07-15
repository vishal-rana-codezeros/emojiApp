var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema({


    categoryName: { type: String },
    image: [{ type: String, default: '' }],
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: "ACTIVE" },
    description: String,
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },


})

schema.plugin(mongoosePaginate)
module.exports = mongoose.model('categoryschema', schema);

