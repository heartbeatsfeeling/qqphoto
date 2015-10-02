module.exports=function(app,db,config,logger){
	require('./qqphoto-login.js')(app,db,config,logger);
	require('./qqphoto-addArticle.js')(app,db,config,logger);
	require('./qqphoto-articleList.js')(app,db,config,logger);
	require('./qqphoto-loginOut.js')(app,db,config,logger);
	require('./qqphoto-index.js')(app,db,config,logger);
	require('./qqphoto-list.js')(app,db,config,logger);
};