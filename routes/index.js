module.exports=function(app,db){
	require('./qqphoto-login.js')(app,db);
	require('./qqphoto-addArticle.js')(app,db);
};