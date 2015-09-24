module.exports=function(app,db,config){
	require('./qqphoto-login.js')(app,db);
	require('./qqphoto-addArticle.js')(app,db,config);
	require('./qqphoto-articleList.js')(app,db,config);
	require('./qqphoto-loginOut.js')(app,db,config);
};