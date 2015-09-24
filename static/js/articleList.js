require(['config'], function(config) {
	var r = require.config(config.requireConfig);
	r(['jquery', 'jquery.dialog',"jquery.twbsPagination"], function() {
		var $minImg = $('.minImg');
		$minImg.on('click', function() {
			var $this = $(this);
			var src = this.src;
			dialog({
				title: "查看大图",
				content: "<img src='" + src + "' />"
			}).showModal();
		});
		$('#pagination').twbsPagination({
			totalPages: totalPage,
			visiblePages: 7,
			href:"/articleList/{{number}}",
			onPageClick: function(event, page) {
				$('#page-content').text('Page ' + page);
			}
		});
	});
})