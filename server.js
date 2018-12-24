var env = require('dotenv').config();
const config = require('./lib/config');
var cors = require('cors')

config.dbConfig(config.cfg, (err) => {
	if (err) {
		console.log(err)
		return;

	}
	const express = require('express')
	const app = express()
	app.use(cors())
	app.locals.rootDir = __dirname;
	var http = require('http').Server(app);
	var socket = require('socket.io')(http);
	config.expressConfig(app, config.cfg.environment);
	if (err) return res.json(err)
	require("./lib/routes")(app);


	const server = app.listen(config.cfg.port, () => {
		console.log(`Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode`);
	});

	const io = socket.listen(server)
	require('./lib/socket/socketHandler')(io)


});




