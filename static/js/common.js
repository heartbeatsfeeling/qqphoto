require(['config'], function(config) {
	var r = require.config(config.requireConfig);
	r(['jquery'], function() {
		var $d = $(document);
		//fn
		var like = function($element, url) {
			var $li = $element.closest('li');
			if ($element.hasClass('loadingStatus')) {

			} else {
				$element.addClass('loadingStatus');
				$.ajax({
					url: url,
					data: {
						id: $li.data('id')
					},
					type: "get",
					dataType: "json",
					complete: function() {
						$element.removeClass('loadingStatus');
					},
					success: function(data) {
						var $clone = $element.clone().html("");
						var left=$element.position().left
						$clone.css({
							position: "absolute",
							left:left
						});
						if (data.code == 1) {
							$clone.appendTo($li.find(".like")).animate({
								top: -200,
								left:left+100
							},1000,function(){
								$clone.remove();
								$element.find('span').text(+$element.find('span').html()+1);
							});
						}
					},
					error: function() {}
				})
			}
		};
		$d.on('click', '.up', function() { //顶
			var $this = $(this);
			like($this, "/up");
		})
		$d.on('click', '.down', function() { //踩
			var $this = $(this);
			like($this, "/down");
		})
	});
})