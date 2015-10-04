require(['config'], function(config) {
	var r = require.config(config.requireConfig);
	r(['jquery', 'jquery.validate'], function() {
		var $form = $('form');
		var $button = $("button")
		$form.bind('submit', function(e) {
			if (validate.get('form').valid()) {
				
			} else {
				//e.preventDefault();
			}
		});
		$form.on('click','.addPhoto',function(){
			var $this=$(this);
			var $formgroup=$this.closest('.formgroup')
			var $element=$formgroup.find(".input").eq(0).clone();
			$element.find("input:file").val("");
			$formgroup.find('.input').last().after($element);
		});
		validate({
			id: "form",
			tipPlacement: function(element, tip) {
				$(element).closest(".formgroup").find('.tip').html(tip);
			},
			rules: {
				'title': {
					wrong: "请输入标题",
					right: "",
					empty: '请输入标题',
					focus: "",
					required: true
				},
				'desc': {
					wrong: "请输入描述",
					right: "",
					empty: '请输入描述',
					focus: "",
					required: true
				},
				'file':{
					wrong: "请输入选择图片",
					right: "",
					empty: '请输入选择图片',
					focus: "",
					required: true
				}
			}
		});
		//init
		if(window['success']){
			$("<div class='add'>+1</div>").appendTo('body').animate({
				top:0,
				opacity:0
			},1000);
		};
	});
})