var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema({

    category  : { type: String},
    status    : { type:String,enum:['ACTIVE','INACTIVE'],default:"ACTIVE"},
    createdBy : { type: String },
    createdAt : { type: Date, default: Date.now },
    editedAt  : { type: Date, default: Date.now }

})

schema.plugin(mongoosePaginate)
module.exports = mongoose.model('category', schema);

