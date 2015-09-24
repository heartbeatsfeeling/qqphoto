module.exports=function(app,db,config){
	app.get("/loginOut",function(req,res){
		delete req.session.userName;
		res.redirect('/login');
	});
};