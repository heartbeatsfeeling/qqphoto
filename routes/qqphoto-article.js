module.exports = function(app, db, config, logger) {
	var mongodb = require("mongodb"),
		moment = require("moment");
	app.get("/article/:id", function(req, res) {
		var id=req.params.id;
		console.log(id);
		if (id&&id.length===24) {
			db.collection('article').find({
				_id: mongodb.ObjectId(id)
			}).toArray(function(err, doc) {
				if (err) {
					res.render("404");
				} else {
					if (doc.length) {
						db.collection('article').update({
							_id: mongodb.ObjectId(id)
						}, {
							$inc: {
								view: 1
							}
						});
						doc.forEach(function(item) {
							item.updateTime = moment(Number(item.updateTime)).format("YYYY-MM-DD HH:mm");
							item.view += 1;
						});
						res.render("qqphoto-article", {
							data: doc[0],
							type: doc[0].type,
							cnType: config.type[doc[0].type]
						});
					} else {
						res.render("404");
					}
				}
			})
		} else {
			res.render("404");
		}
	});
}