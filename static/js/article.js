require(['config'], function(config) {
	var r = require.config(config.requireConfig);
	r(['jquery', 'jquery.dialog'], function() {
		var $d=$(document);
		
	});
})