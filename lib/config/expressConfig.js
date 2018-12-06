'use strict'
var express=require('express')
var bodyparser = require('body-parser')
var morgan = require('morgan')
module.exports = function(app,env)
{
	app.use(bodyparser.json())
	app.use(bodyparser.urlencoded({extended:false,limit:'50mb'}));
	app.use(morgan('combined'))
	app.use('/',express.static(process.cwd()+'/public/build'))
	console.log(`printing current directory ${process.cwd()}`)
	app.use('/apiDocs',express.static(process.cwd()+"/api/dist"))
}