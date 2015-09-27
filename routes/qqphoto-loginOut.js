module.exports=function(app,db,config,logger){
	app.get("/loginOut",function(req,res){
		delete req.session.userName;
		res.redirect('/login');
	});
};