module.exports = function(app,db) { //登录
	var crypto = require('crypto');
	app.get("/admin", function(req, res) { //管理员
		res.render('login');
	});
	app.post("/admin", function(req, res) {
		var body = req.body,
			userName = body.userName,
			password = body.password,
			result = {
				code: 0,
				msg: ""
			},
			md5,
			md5Password = '';
		if (!userName || !password) {
			result = {
				code: 0,
				msg: "用户名或密码不能为空"
			};
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
					result = {
						code: 0,
						msg: "查询数据库失败"
					}
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
						result = {
							code: 0,
							msg: "用户不存在或密码错误"
						}
					}
				};
				res.json(result)
			})
		}

	})
};