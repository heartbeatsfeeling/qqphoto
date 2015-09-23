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
				if (err) {
					res.render('articleList', {
						msg: "查询出错"
					});
				} else {
					if (doc.length) {
						data = doc.splice(skip, num);
						if (data.length) {
							data.forEach(function(item, index) {
								item.updateTime = moment(Number(item.updateTime)).format("YYYY-MM-DD HH:mm");
								item.imgSrc = "/upload/" + item.imgSrc;
								item.status = item.status == 0 ? "审核" : "正常显示";
								item.type = config.type[item.type];
							});
							res.render('articleList', {
								msg: "",
								data: data
							});
						}else{
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
};