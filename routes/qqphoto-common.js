module.exports = function(app, db, config, logger) {
	var mongodb=require("mongodb"),
		moment=require("moment");
	app.get('/download',function(req,res){//下载
		var imgId=req.query.imgId;
		var id=req.query.id;
		db.collection('article').update({
			_id: mongodb.ObjectId(id)
		}, {
			$inc: {
				downLoad: 1
			}
		});
		res.download("./static/upload/"+imgId);	
	})
}