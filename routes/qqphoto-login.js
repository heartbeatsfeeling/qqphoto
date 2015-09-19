module.exports = function(app) {//登录
	app.get("/admin",function(req,res){//管理员
		res.render('login');
	});
};