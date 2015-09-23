require(['config'], function(config) {
	var r = require.config(config.requireConfig);
	r(['jquery', 'jquery.validate'], function() {
		var $form = $('form');
		var $button = $("button")
		$form.bind('submit', function(e) {
			e.preventDefault();
			if (validate.get('form').valid()) {
				if ($button.hasClass('loadingStatus')) {
					return false;
				} else {
					$button.html("<i class='loading2'></i>").addClass('loadingStatus');
					$.ajax({
						url: $form.attr('action'),
						type: $form.attr('method'),
						data: $form.serialize(),
						dataType:"json",
						success: function(data) {
							if(data.code==0){
								$('.tip').html(data.msg)
							}else{
								$('.tip').html("");
								window.location.href='/addArticle'
							}
						},
						error: function() {},
						complete: function() {
							$button.html("登录").removeClass('loadingStatus')
						}
					})
				}
			} else {

			}
		});
		validate({
			id: "form",
			tipPlacement: function(element, tip) {
				$('.tip').html(tip);
			},
			rules: {
				'userName': {
					wrong: "请输入用户名和密码",
					right: "",
					empty: '请输入用户名和密码',
					focus: "",
					required: true
				},
				'password': {
					wrong: "请输入用户名和密码",
					right: "",
					empty: '请输入用户名和密码',
					focus: "",
					required: true
				}
			}
		})
	});
})