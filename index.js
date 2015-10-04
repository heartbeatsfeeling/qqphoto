var express = require('express');
var app = express();
var log4js = require('log4js');
var multer=require("multer");
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
		require('./routes')(app, db, config, logger);
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
logger.setLevel('WARN');
app.use(log4js.connectLogger(logger, {
	format: ':method :url :remote-addr'
}));
/*other*/
//上传文件区
app.get('/uploadFile', function(req, res) {
	res.sendfile('./static/uploadFile.html');
});
//validate
app.get('/validate', function(req, res) {
	res.sendfile('./static/validate/index.html');
});
app.post('/file', multer({
	dest: './static/upload/'
}), function(req, res) {
	var str = req.files.file.path;
	var fileName = str.substring(str.lastIndexOf('/') + 1);
	var type = " " + fileName.split('.').pop() + " ";
	var filterType = ' png gif jpg ';
	var data = null;
	if (filterType.indexOf(type) != -1) {
		data = {
			flag: true,
			id: 1, //测试使用
			path: 'http://115.28.213.244:3000/upload/' + fileName
		};
	} else {
		data = {
			flag: false,
			id: '',
			path: ''
		}
	};
	res.end("<body onload=" + "parent.uploadFile.success(" + JSON.stringify(data) + ")></body>");
});
/* //other*/
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'jade');
app.set('views', __dirname + "/views");
app.use(require('body-parser')());
app.use(require('express-session')({
	secret: 'keyboard cat'
}));
app.listen(3000);