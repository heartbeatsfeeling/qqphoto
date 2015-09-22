var express = require('express');
var app = express();
var log4js = require('log4js');
var multer = require('multer');
//db
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;
var config = require("./config")();
MongoClient.connect(config.mongodb, function(err, database) {
	if (err) {
		console.log(err);
	} else {
		db = database;
		require('./routes')(app,db);
		//500
		//404
		app.use(function(req, res) { //404
			res.render('404');
		});
		app.use(function(err, req, res) { //500
			res.render('500');
		});
		console.log("Listening on port 3000");
	};
});
//log
log4js.configure({
	appenders: [{
		type: "console"
	}, {
		type: 'file',
		filename: 'logs/access.log',
		maxLogSize: 1024 * 1024 * 1000,
		backups: 4,
		category: 'normal'
	}],
	replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, {
	format: ':method :url :remote-addr'
}));
//end log
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'jade');
app.set('views', __dirname + "/views");
app.use(require('body-parser')());
app.use(require('express-session')({
	secret: 'keyboard cat'
}));
app.use(multer({
	dest: './static/upload/'
}))
app.listen(3000);