module.exports = function(app,db,config,logger) { //登录
	var crypto = require('crypto'),
		pFlg="qqphoto-login";
	app.get("/login", function(req, res) { //管理员
		if(req.session.userName){
			res.redirect("/addArticle");
		}else{
			res.render('login');
		}
	});
	app.post("/login", function(req, res) {
		var body = req.body,
			userName = body.userName,
			password = body.password,
			msg="",
			result = {
				code: 0,
				msg: msg
			},
			md5,
			md5Password = '';
		if (!userName || !password) {
			msg="用户名或密码不能为空"
			result = {
				code: 0,
				msg: msg
			};
			logger.warn(msg,pFlg,req.ip);
			res.json(result)
		} else {
			md5 = crypto.createHash('md5');
			md5.update(password);
			md5Password = md5.digest('hex');
			result.md5Password = md5Password;
			db.collection('user').find({
				name: userName,
				password: md5Password
			}).count(function(error, doc) {
				if (error) {
					msg="查询数据库失败"
					result = {
						code: 0,
						msg: msg
					}
					logger.warn(msg,pFlg,req.ip);
				} else {
					if (doc>=1) {
						db.collection('user').update({ //更新库
							name: userName,
							password: md5Password
						}, {
							$inc: {
								"loginConut": 1
							},
							$set: {
								"lastLoginTime": (+new Date()).toString()
							}
						}, false, true);
						result = {
							code: 1,
							msg: "登录成功"
						};
						req.session.userName=userName;
						req.session.password=md5Password;
					} else {
						msg="用户不存在或密码错误"
						result = {
							code: 0,
							msg: msg
						};
						logger.warn(msg,pFlg,req.ip);
					}
				};
				res.json(result)
			})
		}

	})
};