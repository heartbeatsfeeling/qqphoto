module.exports = function(app,db) {
	app.get('/add', function(req, res) {
		var userName=req.session.userName;
		if(userName){
			res.render('add',{
				msg:"",
				success:false
			})
		}else{
			res.redirect("/admin");
		}
	});
	app.post('/add', function(req,res) {
		var file=req.files.file,
			body=req.body,
			img,
			imgExt,
			filterType="gif,jpg,png",
			msg="",
			title=body.title,
			desc=body.desc,
			userName='',
			type=body.type;
		if(!file){
			msg="头像不能为空";
			res.render('add',{
				msg:msg,
				success:false
			});
		}else if(!title){
			msg="标题不能为空";
			res.render('add',{
				msg:msg,
				success:false
			});
		}else if(!desc){
			msg="描述不能为空";
			res.render('add',{
				msg:msg,
				success:false
			});
		}else{
			img=file.name;
			imgExt=req.files.file.extension;
			if(filterType.indexOf(imgExt)!=-1){
				userName=req.session.userName;
				if(userName){
					db.collection('article').insert({
						author:userName,
						desc:desc,
						title:title,
						imgSrc:img,
						updateTime:(+new Date()).toString(),
						up:0,
						down:0,
						collect:0,
						view:0,
						status:'0'
					},function(err){
						if(err){
							msg="数据库操作失败"
							res.render('add',{
								msg:msg,
								success:false
							});
							return true;
						}else{
							res.render('add',{
								msg:"",
								success:true
							});
							return true;
						}
					})
				}else{
					res.redirect('/admin');
					return true;
				}
			}else{
				msg="图片格式不正确";
				res.render('add',{
					msg:msg,
					success:false
				});
			}
		}
	});
};