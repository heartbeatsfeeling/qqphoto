module.exports = function(app, db, config, logger) {
	var pFlg = "qqphoto-articleList";
	app.get("/articleList/:id", function(req, res) {
		var moment = require('moment'),
			userName = req.session.userName,
			num = 10,
			id = req.params.id,
			skip = (id - 1) * num,
			page = num * id,
			msg = "";
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
					msg = "查询出错";
					logger.warn(msg, pFlg, req.ip)
					res.render('articleList', {
						msg: msg
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
	var articleChange = function(url, cmd) {
		app.get(url, function(req, res) { //审核
			var id = req.query.id,
				msg = '',
				userName = req.session.userName,
				password = req.session.password,
				xhr = req.xhr,
				sourceRef = req.headers.referer,
				code = 0;
			if (!userName) {
				msg = "请先登录";
				logger.warn(msg, userName, pFlg, req.ip)
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
						name: userName,
						password: password
					}).toArray(function(err, doc) {
						if (err) {
							msg = "数据库操作失败";
							logger.warn(msg, pFlg, req.ip)
							if (xhr) {
								res.json({
									msg: msg,
									code: "0"
								});
							} else {
								res.redirect(sourceRef);
							}
						} else {
							if (doc.length) {
								if (doc[0].type == 1) {
									db.collection('article')[cmd]({
										_id: require("mongodb").ObjectId(id)
									}, {
										$set: {
											status: "1"
										}
									}, function(err, doc) {
										if (err) {
											msg = "数据库操作失败"
											if (xhr) {
												res.json({
													msg: msg,
													code: "0"
												});
											} else {
												res.redirect("/loginOut");
											}
										} else {
											if (doc.result.n == 1) {
												msg = "操作成功";
												if (xhr) {
													res.json({
														msg: msg,
														code: "1"
													});
												} else {
													res.redirect(req.headers.referer);
												};
											} else {
												msg = "文章不存在";
												logger.warn(msg, userName, pFlg, req.ip)
												if (xhr) {
													res.json({
														msg: msg,
														code: "0"
													});
												} else {
													res.redirect(req.headers.referer);
												}
											}

										}
									})
								} else {
									msg = "该用户没有权限";
									logger.warn(msg, userName, pFlg, req.ip)
									if (xhr) {
										res.json({
											msg: msg,
											code: "0"
										});
									} else {
										res.redirect("/loginOut");
									}
								}
							} else {
								msg = "用户名或密码不正确";
								logger.warn(msg, userName, pFlg, req.ip);
								if (xhr) {
									res.json({
										msg: msg,
										code: "0"
									});

								} else {
									res.redirect("/loginOut");
								}
							}
						}
					});
				} else {
					msg = "文章不存在";
					logger.warn(msg, userName, pFlg, req.ip)
					if (xhr) {
						res.json({
							msg: msg,
							code: "0"
						});
					} else {
						res.redirect(sourceRef);
					}
				}
			};
		})
	};
	articleChange("/articleOk",'update');//更新文章状态
	articleChange("/articleDel",'remove');//删除文章
};