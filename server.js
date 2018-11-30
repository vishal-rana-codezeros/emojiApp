var mongoose = require('mongoose')
var express = require('express')
var config_index = require('./lib/config/index')
var app = express()
var bodyparser = require('body-parser')
var env = require('dotenv').config()
app.use(bodyparser.json({ extended: true, limit: '50mb' }))
app.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }))
require('./lib/routes')(app)

mongoose.connect(config_index.URL, { userNewUrlParser: true })
app.listen(config_index.port, () => {
	console.log(`server started `)
})






