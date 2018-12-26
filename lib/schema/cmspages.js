var mongoose = require('mongoose')
var schema = mongoose.Schema({

title:{type:String},
description:{type:String},
createdBy:{type:String},
createdAt: { type: Date, default: Date.now }


});

module.exports=mongoose.model('cmsPages',schema);