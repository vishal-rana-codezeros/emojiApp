var express=require('express')
var config_index=require('./index')
var app = express()


var bodyparser = require('body-parser')
app.use(bodyparser.json())

const expressConfig = app.listen(config_index.port,()=>
{
	console.log(`server started `)
})


module.exports = expressConfig