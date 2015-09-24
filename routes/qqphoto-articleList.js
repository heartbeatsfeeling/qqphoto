module.exports = function(app, db, config) {
	app.get("/articleList/:id", function(req, res) {
		var moment = require('moment');
		var userName = req.session.userName;
		var num = 10;
		var id = req.params.id;
		var skip = (id - 1) * num;
		var page = num * id;
		if (userName) {
			db.collection('article').find({
				author: userName
			}, {
				sort: {
					'updateTime': -1
				}
			}).toArray(function(err, doc) {
				var data = null;
				var cloneDoc = doc.slice(0);
				if (err) {
					res.render('articleList', {
						msg: "查询出错"
					});
				} else {
					if (doc.length) {
						data = cloneDoc.splice(skip, num);
						if (data.length) {
							data.forEach(function(item, index) {
								item.updateTime = moment(Number(item.updateTime)).format("YYYY-MM-DD HH:mm");
								item.imgSrc = "/upload/" + item.imgSrc;
								item.status = item.status == 0 ? "审核中" : "正常显示";
								item.type = config.type[item.type];
							});
							res.render('articleList', {
								totalPage: Math.ceil((doc.length) / num),
								msg: "",
								current: "articleList",
								data: data
							});
						} else {
							res.render('404');
						}

					} else {
						res.render('articleList', {
							msg: "没有文章"
						});
					}
				}
			})

		} else {
			res.redirect("/login");
		}
	});
	app.get("/articleOk", function(req, res) { //审核
		var id = req.query.id,
			msg = '',
			userName = req.session.userName,
			password = req.session.password,
			xhr = req.xhr,
			code = 0;
		if (!userName) {
			if (xhr) {
				res.json({
					msg: "请先登录",
					code: "0",
					url: "/login"
				});
			} else {
				res.redirect("/login");
			}
		} else {
			if (id) {
				db.collection('user').find({
					userName: userName,
					password: password
				}).toArray(function(err, doc) {
					if (err) {
						if (xhr) {
							res.json({
								msg: "数据库操作失败",
								code: "0"
							});
							console.warn("数据库操作失败:qqphoto-articleList:1");
						} else {
							res.redirect("/articleList/1");
							console.warn("数据库操作失败:qqphoto-articleList:2");
						}
					} else {
						if (doc.length) {
							if (doc[0].type == 1) {

							} else {
								if (xhr) {
									res.json({
										msg: "该用户没有权限",
										code: "0"
									});
								} else {
									res.redirect("/loginOut");

								}
								console.warn("该用户没有权限:qqphoto-articleList");
							}
						} else {
							if (xhr) {
								res.json({
									msg: "用户名或密码不正确",
									code: "0"
								});
								
							} else {
								res.redirect("/loginOut");
							}
							console.warn("用户名或密码不正确:qqphoto-articleList");
						}
					}
				})
				if (xhr) {
					res.json({
						msg: "",
						code: "1"
					});
				} else {
					res.redirect("/articleList/1");
				}
			} else {
				if (xhr) {
					res.json({
						msg: "文章不存在",
						code: "0"
					});
				} else {
					res.redirect("/articleList/1");
				}
			}
		};
	})
};