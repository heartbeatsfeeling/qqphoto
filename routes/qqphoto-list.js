module.exports = function(app, db, config, logger) {
	var moment=require('moment');
	app.get("/list/:id/:page", function(req, res) {
		var query = req.params,
			type = query.id,
			page = query.page || 1,
			cnType = config.type[type],
			num = 20,
			skip = (page - 1) * num;
		if (cnType) {
			db.collection('article').find({
				type: type
			}, {
				sort: {
					updateTime: -1
				}
			}).toArray(function(err, doc) {
				var data = [];
				if (err) {
					res.render("404")
				} else {
					data = doc.slice(0).splice(skip, num);
					if (data.length) {
						data.forEach(function(item,i){
							item.time = moment(Number(item.updateTime)).format("YYYY-MM-DD HH:mm");
						});
						res.render("qqphoto-list", {
							totalPage: Math.ceil((doc.length) / num),
							data: data,
							type:type,
							title: cnType
						});
					}else{
						res.render("404")
					}
				}
			});

		} else {
			res.render('404');
		}

	});
};