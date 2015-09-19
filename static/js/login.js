require(['config'], function(config) {
	var r = require.config(config.requireConfig);
	r(['jquery', 'jquery.validate'], function() {
		var $form=$('form');
		$form.bind('submit',function(e){
			e.preventDefault();
			if(validate.get('form').valid()){

			}else{
				
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