module.exports = function(app) { //登录
	var crypto = require('crypto');
	var mongodb = require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var db;
	MongoClient.connect('mongodb://115.28.213.244:27017/qqphoto', function(err, database) {
		if (err) {
			console.log(err);
		} else {
			db = database;
			console.log("Listening on port 3000");
		};
	});
	app.get("/admin", function(req, res) { //管理员
		res.render('login');
	});
	app.post("/admin", function(req, res) {
		var body = req.body,
			userName = body.userName,
			password = body.password,
			result={
				code:0,
				msg:""
			},
			md5,
			md5Password='';
		if(!userName||!password){
			result={
				code:0,
				msg:"用户名或密码不能为空"
			};
			res.json(result)	
		}else{
			md5=crypto.createHash('md5');
			md5.update(password);
			md5Password=md5.digest('hex');
			console.log(md5Password)
			result.md5Password=md5Password;
			db.collection('user').find({
				name:userName,
				password:md5Password
			}).toArray(function(error,data){
				if(error){
					result={
						code:0,
						msg:"查询数据库失败"
					}
				}else{
					if(data.length){
						result={
							code:1,
							msg:"登录成功"
						}
					}else{
						result={
							code:0,
							msg:"用户不存在或密码错误"
						}
					}
				};
				res.json(result)	
			})
		}
		
	})
};