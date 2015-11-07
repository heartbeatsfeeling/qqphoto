module.exports = function(app, db, config, logger) {
	var path = require('path');
	var fs = require('fs');
	var gm = require('gm')
	app.post('/gm-blur', function(req, res) {
		var data = req.body;
		var imgName = data.imgName;
		var inputPath = "./static/upload/" + imgName;
		var outPath = './static/change/'+'blur-'+imgName;
		fs.access(inputPath, fs.F_OK, function(error) {
			if (error) {
				res.json({
					code: 0
				});
			} else {
				gm(inputPath)
					.implode(-1.2)
					.autoOrient()
					.write(outPath, function(err) {
						if (err) {
							res.json({
								code: 0
							});
							console.log('写入错误')
						} else {
							res.json({
								code: 1
							});
						}
					});
			}
		})
	});
};