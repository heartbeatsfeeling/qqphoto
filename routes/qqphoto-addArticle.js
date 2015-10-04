module.exports = function(app, db, config, logger) {
	var multer = require('multer'),
		pFlg = "qqphoto-addArticle";
	app.get('/addArticle', function(req, res) {
		var userName = req.session.userName;
		if (userName) {
			res.render('addArticle', {
				msg: "",
				data: config.type,
				current: "addArticle"
			})
		} else {
			res.redirect("/login");
		}
	});
	app.post('/addArticle', multer({
		dest: './static/upload/',
		onFileUploadStart: function(file) {
			if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif') {
				return false;
			}
		}
	}), function(req, res) {
		var files = req.files.file,
			body = req.body,
			img,
			imgExt,
			filterType = "gif,jpg,png",
			msg = "",
			title = body.title,
			desc = body.desc,
			userName = '',
			fileArr = [],
			type = body.type;
		if (!files) {
			msg = "头像不能为空或是格式不正确";
			res.render('addArticle', {
				msg: msg,
				data: config.type,
				current: "addArticle"
			});
			logger.warn(msg, pFlg, req.ip)
		} else if (!title) {
			msg = "标题不能为空";
			logger.warn(msg, pFlg, req.ip)
			res.render('addArticle', {
				msg: msg,
				data: config.type,
				current: "addArticle"
			});
		} else if (!desc) {
			msg = "描述不能为空";
			logger.warn(msg, pFlg, req.ip)
			res.render('addArticle', {
				msg: msg,
				data: config.type,
				current: "addArticle"
			});
		} else {
			if (!files.length) {
				fileArr.push(files);
			}else{
				fileArr=files;
			};
			userName = req.session.userName;
			if (userName) {
				db.collection('article').insert({
					author: userName,
					desc: desc,
					title: title,
					imgSrc: fileArr,
					updateTime: (+new Date()).toString(),
					type: body.type,
					up: 0,
					down: 0,
					collect: 0,
					view: 0,
					status: '0'
				}, function(err) {
					if (err) {
						msg = "数据库操作失败"
						logger.warn(msg, pFlg, req.ip)
						res.render('addArticle', {
							msg: msg,
							data: config.type,
							current: "addArticle"
						});
						return false;
					} else {
						res.redirect('/articleList/1');
						return true;
					}
				})
			} else {
				res.redirect('/login');
				return false;
			}
		}
	});
};