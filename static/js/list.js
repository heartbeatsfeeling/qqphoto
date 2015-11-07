require(['config'], function(config) {
	var r = require.config(config.requireConfig);
	r(['jquery', 'jquery.dialog',"jquery.twbsPagination"], function() {
		$('#pagination').twbsPagination({
			totalPages: totalPage,
			visiblePages: 7,
			href:"/list/"+type+"/{{number}}",
			onPageClick: function(event, page) {}
		});
	});
})