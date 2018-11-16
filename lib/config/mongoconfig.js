var mongoose=require('mongoose')
var config_index=require('./index')
const MongooseConnection=mongoose.connect(config_index.URL,{userNewUrlParser:true})
module.exports=MongooseConnection






