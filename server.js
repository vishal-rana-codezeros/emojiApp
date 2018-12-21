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
	config.expressConfig(app, config.cfg.environment);
	if (err) return res.json(err)
	require("./lib/routes")(app);


	app.listen(process.env.PORT, () => {
		console.log(`Express server listening on ${process.env.PORT}, in ${config.cfg.TAG} mode`);
	});



});




