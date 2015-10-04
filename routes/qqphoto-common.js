module.exports = function(app, db, config, logger) {
	var mongodb=require("mongodb"),
		moment=require("moment");
	app.get('/download',function(req,res){//下载
		var id=req.query.id;
		res.download("./static/upload/"+id);	
	})
}