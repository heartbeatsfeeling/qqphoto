module.exports = function(app, db, config, logger) {
	var moment = require('moment'),
		mongodb = require('mongodb');
	app.get("/index.html", function(req, res) { //首页
		db.collection("article").find({
			status: '1'
		}, {
			sort: {
				up: -1
			},
			limit: 30
		}).toArray(function(err, doc) {
			if (err) {
				res.render('404')
			} else {
				doc.forEach(function(item, i) {
					item.updateTime = moment(Number(item.updateTime)).format("YYYY-MM-DD HH:mm");
				});
				res.render('qqphoto-index', {
					data: doc
				})
			}
		})
	});
	var like = function(url, cmd, set) {
		app.get(url, function(req, res) {
			var id = req.query.id,
				_id = mongodb.ObjectId(id);
			if (id) {
				db.collection('article')[cmd]({
					_id: _id
				}, set, function(err, doc) {
					if (err) {
						res.json({
							msg: "出错",
							code: 0
						})
					} else {
						if (doc.result.n == 1) {
							res.json({
								msg: "",
								code: 1
							})
						} else {
							res.json({
								msg: "出错",
								code: 0
							})
						}
					}
				})
			} else {
				res.json({
					msg: "出错",
					code: 0
				})
			}
		});
	};
	like('/up', 'update', { //顶
		$inc: {
			up: 1
		}
	});
	like('/down', 'update', { //踩
		$inc: {
			down: 1
		}
	});
};