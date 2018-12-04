const _ = require("lodash")
const dbConfig = require("./dbConfig");
const expressConfig = require("./expressConfig")
const path = require("path");
var envConfig = {};
var cfg = {};
var enviroment = process.env.NODE_ENV  || 'dev';

switch(enviroment){
	case 'dev':
	case 'development':
	envConfig= require('./env/development');
	break;
	case 'prod':
	case 'production':
	envConfig= require('./env/production');
	break;
	case 'stag':
	case 'staging':
	envConfig= require('./env/staging');
	break;
}

var defaultconfig={
enviroment:"development",
ip:'localhost',
port:process.env.PORT,
protocol:'http',
TAG:"development",
uploadDir: path.resolve("./uploads"),
mongo:{
	dbName:process.env.dbName,
	dbUrl:process.env.dbUrl,
},
Swager_port :80


};

var cfg = _.extend(defaultconfig,envConfig);

module.exports={
	cfg,
	dbConfig,
	expressConfig
}